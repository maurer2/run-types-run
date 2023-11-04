import { expect, test } from '@playwright/experimental-ct-react';

import type { Fail, Loading, Payload } from '../../hooks/useFetchValue/types';

import Component from '.';

export const loadingState: Loading = {
  progress: {
    defaultValues: true,
    formSettings: true,
  },
  status: 'loading'
};


test.describe(() => {
  test('test', async ({ mount }) => {
    const component = await mount(<Component fetchingState={loadingState} />);

    await expect(component.locator('progress')).toHaveCount(2);
    await expect(component.getByText('is loading')).toHaveCount(2);
  });
});
