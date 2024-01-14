import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { type MockInstance, afterEach, describe, expect, it, vi } from 'vitest';

import type { Fail, Idle, Pending, Success } from './types';

import useSendValues from '.';
import { queryClientConfig } from '../../app/providers';
import * as helpers from './helpers';

describe('useSendValues', () => {
  let queryClient: QueryClient;
  let spy: MockInstance;

  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => {
    queryClient = new QueryClient(queryClientConfig);
    spy = vi.spyOn(queryClient, 'invalidateQueries');

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  const url = '/api';
  const payload = {
    data: [1, 2, 3],
  };
  type Payload = typeof payload;

  describe('idle', () => {
    it('should have idle state by default', async () => {
      vi.spyOn(helpers, 'sendValues').mockReturnValue(new Promise(vi.fn()));
      const onSuccessCallback = vi.fn();

      const { result } = renderHook(() => useSendValues<Payload>(['key'], url, onSuccessCallback), {
        wrapper,
      });

      expect(result.current).toMatchObject({
        status: 'idle',
      } satisfies Idle);
    });
  });

  describe('pending', () => {
    it('should have pending state when mutation is triggered', async () => {
      const mockSender = vi.spyOn(helpers, 'sendValues').mockReturnValue(new Promise(vi.fn()));
      const onSuccessCallback = vi.fn();

      const { result } = renderHook(() => useSendValues<Payload>(['key'], url, onSuccessCallback), {
        wrapper,
      });
      result.current.mutate(payload);

      await waitFor(async () => {
        await expect(mockSender).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'pending',
      } satisfies Pending);
    });
  });

  describe('success', () => {
    it('should have success state when mutation is successful', async () => {
      const mockSender = vi.spyOn(helpers, 'sendValues').mockResolvedValue({ status: 'success' });
      const onSuccessCallback = vi.fn();

      const { result } = renderHook(() => useSendValues<Payload>(['key'], url, onSuccessCallback), {
        wrapper,
      });
      result.current.mutate(payload);

      await waitFor(async () => {
        await expect(mockSender).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject({
        status: 'success',
      } satisfies Success);
    });

    it('should call onSuccessCallback when mutation is successful', async () => {
      const mockSender = vi.spyOn(helpers, 'sendValues').mockResolvedValue({ status: 'success' });
      const onSuccessCallback = vi.fn();

      const { result } = renderHook(() => useSendValues<Payload>(['key'], url, onSuccessCallback), {
        wrapper,
      });
      result.current.mutate(payload);

      await waitFor(async () => {
        await expect(mockSender).toHaveBeenCalled();
      });

      expect(onSuccessCallback).toHaveBeenCalled();
    });

    it('should invalidate queries when mutation is successful', async () => {
      const mockSender = vi.spyOn(helpers, 'sendValues').mockResolvedValue({ status: 'success' });
      const onSuccessCallback = vi.fn();
      const queryKeysToInvalidate: string[] = ['old-key'];

      const { result } = renderHook(
        () => useSendValues<Payload>(['key'], url, onSuccessCallback, queryKeysToInvalidate),
        { wrapper },
      );
      result.current.mutate(payload);

      await waitFor(async () => {
        await expect(mockSender).toHaveBeenCalled();
      });

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: queryKeysToInvalidate,
        }),
      );
    });
  });

  describe('fail (error)', () => {
    it('error response', async () => {
      vi.spyOn(helpers, 'sendValues').mockRejectedValue(new Error('404'));
      const mockSender = vi.spyOn(helpers, 'sendValues').mockRejectedValue(new Error('404'));
      const onSuccessCallback = vi.fn();

      const { result } = renderHook(() => useSendValues<Payload>(['key'], url, onSuccessCallback), {
        wrapper,
      });
      result.current.mutate(payload);

      await waitFor(async () => {
        await expect(mockSender).toHaveBeenCalled();
      });

      expect(result.current).toMatchObject(
        expect.objectContaining({
          status: 'error',
        }) satisfies Fail,
      );
    });
  });
});
