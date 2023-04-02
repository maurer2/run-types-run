import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { z } from 'zod';

import useFetchValue from '.';
import type { Loading, Success, Fail } from './types';
import * as fetcherModule from '../../helpers/fetcher';

// vi.mock('../../helpers/fetcher', () => ({
//   fetcher: vi.fn().mockResolvedValue({ test: 'test' }),
// }));

// vi.mock('../../helpers/fetcher', async () => ({
//   ...(await vi.importActual<any>('../../helpers/fetcher')),
//   fetcher: vi.fn().mockResolvedValue({ test: 'test' }),
// }));

describe('useFetchStartValues', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        provider: () => new Map(),
        dedupingInterval: 0,
      }}
    >
      {children}
    </SWRConfig>
  );
  const url = '/api';
  const schema = z
    .object({
      name: z.string(),
    })
    .strict();
  type Schema = z.infer<typeof schema>;

  describe('loading', () => {
    it('should have loading state by default', async () => {
      const mockFetcher = vi.spyOn(fetcherModule, 'fetcher').mockReturnValue(new Promise(vi.fn()));

      const { result } = renderHook(() => useFetchValue<Schema>(url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'loading',
      } satisfies Loading);
    });
  });

  describe('success', () => {
    it("payload is correct e.g. schema parsing doesn't fail", async () => {
      const mockFetcher = vi.spyOn(fetcherModule, 'fetcher').mockResolvedValue({ name: 'Mittens' });

      const { result } = renderHook(() => useFetchValue<Schema>(url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'success',
        payload: { name: 'Mittens' },
      } satisfies Success<Schema>);
    });
  });

  describe('fail', () => {
    it('no response', async () => {
      const mockFetcher = vi.spyOn(fetcherModule, 'fetcher').mockResolvedValue(null);

      const { result } = renderHook(() => useFetchValue<Schema>(url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'fail',
        errors: 'Loading error',
      } satisfies Fail);
    });

    it('error response', async () => {
      const mockFetcher = vi.spyOn(fetcherModule, 'fetcher').mockRejectedValue(new Error('404'));

      const { result } = renderHook(() => useFetchValue<Schema>(url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'fail',
        errors: '404',
      } satisfies Fail);
    });

    it('payload is incorrect e.g. schema parsing fails', async () => {
      const mockFetcher = vi
        .spyOn(fetcherModule, 'fetcher')
        .mockResolvedValue({ nayme: 'Mittens' });

      const { result } = renderHook(() => useFetchValue<Schema>(url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'fail',
        errors: `Error: Required at "name"; Unrecognized key(s) in object: 'nayme'`,
      } satisfies Fail);
    });
  });
});
