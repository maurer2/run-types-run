import { test, expect } from '@playwright/experimental-ct-react';

import Component from '.';

test.describe(() => {
  test('test', async ({ mount }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let hasBeenClicked = false;
    // eslint-disable-next-line no-return-assign
    const component = await mount(<Component label="Label" value="value" onChange={() => hasBeenClicked = true} />);

    await expect(component.locator('label')).toContainText('Label');
    await expect(component.locator('input')).toHaveValue('value');
  });
});
