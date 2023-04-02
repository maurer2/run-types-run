import { test, expect } from '@playwright/experimental-ct-react';

import type { Payload, Loading, Fail } from '../../hooks/useFetchValue/types';

import Component from '.';

export const loadingState: Loading = {
  status: 'loading',
  progress: {
    formSettings: true,
    defaultValues: true,
  }
};


test.describe(() => {
  test('test', async ({ mount }) => {
    const component = await mount(<Component fetchingState={loadingState} />);

    await expect(component.locator('progress')).toHaveCount(2);
    await expect(component.getByText('is loading')).toHaveCount(2);
  });
});
