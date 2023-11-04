import type { ReactNode } from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import type { Fail, Loading, Success } from './types';

import useFetchValue from '.';
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
        dedupingInterval: 0,
        provider: () => new Map(),
        revalidateOnFocus: false,
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
        payload: { name: 'Mittens' },
        status: 'success',
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
        errors: 'Loading error',
        status: 'fail',
      } satisfies Fail);
    });

    it('error response', async () => {
      const mockFetcher = vi.spyOn(fetcherModule, 'fetcher').mockRejectedValue(new Error('404'));

      const { result } = renderHook(() => useFetchValue<Schema>(url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        errors: '404',
        status: 'fail',
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
        errors: `Error: Required at "name"; Unrecognized key(s) in object: 'nayme'`,
        status: 'fail',
      } satisfies Fail);
    });
  });
});
