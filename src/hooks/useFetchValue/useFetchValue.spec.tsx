import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import type { Fail, Loading, Success } from './types';

import useFetchValue from '.';
import { queryClientConfig } from '../../app/providers';
import * as helpers from './helpers';

describe('useFetchStartValues', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient(queryClientConfig);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  const url = '/api';
  const schema = z
    .object({
      name: z.string(),
    })
    .strict();
  type Schema = z.infer<typeof schema>;

  describe('loading', () => {
    it('should have loading state by default', async () => {
      const mockFetcher = vi.spyOn(helpers, 'fetchValues').mockReturnValue(new Promise(vi.fn()));

      const { result } = renderHook(() => useFetchValue<Schema>(['key'], url, schema), { wrapper });

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
      const mockFetcher = vi.spyOn(helpers, 'fetchValues').mockResolvedValue({ name: 'Mittens' });

      const { result } = renderHook(() => useFetchValue<Schema>(['key'], url, schema), { wrapper });

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
      const mockFetcher = vi.spyOn(helpers, 'fetchValues').mockResolvedValue(null);

      const { result } = renderHook(() => useFetchValue<Schema>(['key'], url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        errors: 'Loading error',
        status: 'fail',
      } satisfies Fail);
    });

    it('error response', async () => {
      const mockFetcher = vi.spyOn(helpers, 'fetchValues').mockRejectedValue(new Error('404'));

      const { result } = renderHook(() => useFetchValue<Schema>(['key'], url, schema), { wrapper });

      await waitFor(async () => {
        await expect(mockFetcher).toHaveBeenCalled();
      });

      await waitFor(async () => {
        expect(result.current.status).not.toBe('loading');
      });

      expect(mockFetcher).rejects.toBeTruthy();
      expect(mockFetcher).rejects.toEqual(new Error('404'));
      expect(result.current).toMatchObject({
        errors: '404',
        status: 'fail',
      } satisfies Fail);
    });

    it('payload is incorrect e.g. schema parsing fails', async () => {
      const mockFetcher = vi.spyOn(helpers, 'fetchValues').mockResolvedValue({ nayme: 'Mittens' });

      const { result } = renderHook(() => useFetchValue<Schema>(['key'], url, schema), { wrapper });

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
