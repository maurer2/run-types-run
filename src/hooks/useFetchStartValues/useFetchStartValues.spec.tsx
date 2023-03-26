import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';

import useFetchStartValues from '.';
import type { Loading, Success, Fail } from './types';

// const mockFetch = vi.fn().mockReturnValue(() => new Promise(() => {}));
// global.fetch = mockFetch;

describe('useFetchStartValues', () => {
  afterEach(() => {});

  const urls = ['url1', 'url2'];

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

  describe('loading', () => {
    it('should have loading state by default', () => {
      global.fetch = vi.fn().mockReturnValue(() => new Promise(() => {}));

      const { result } = renderHook(() => useFetchStartValues(urls), { wrapper });
      const [returnValue] = result.current;

      expect(global.fetch).toHaveBeenCalled();
      expect(returnValue).toMatchObject({
        status: 'loading',
        progress: {
          defaultValues: true,
          formSettings: true,
        },
      } satisfies Loading);
    });
  });

  describe('success', () => {
    it('should have success state on fetching success with correct data', () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue({ json: () => new Promise((resolve) => resolve(data)) });

      const { result } = renderHook(() => useFetchStartValues(urls), { wrapper });
      const [returnValue] = result.current;

      console.log(returnValue);
    });
  });

  describe.todo('fail', () => {});
});
