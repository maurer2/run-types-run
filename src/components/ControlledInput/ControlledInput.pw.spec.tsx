import { expect, test } from '@playwright/experimental-ct-react';

import ControlledInput from '.';

test.describe('ControlledInput', () => {
  test('default', async ({ mount }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let hasBeenClicked = false;
    // eslint-disable-next-line no-return-assign
    const component = await mount(<ControlledInput label="Label" onChange={() => hasBeenClicked = true} value="value" />);

    await expect(component.locator('label')).toContainText('Label');
    await expect(component.locator('input')).toHaveValue('value');
  });
});
