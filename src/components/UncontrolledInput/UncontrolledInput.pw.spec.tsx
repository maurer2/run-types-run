import { expect, test } from '@playwright/experimental-ct-react';

import ControlledInput from '.';

test.describe('ControlledInput', () => {
  test('default', async ({ mount }) => {
    const component = await mount(
      <ControlledInput
        error={undefined}
        label="Label"
        name="Fieldname"
        register={(name) => ({ name })} // todo
      />
    );

    await expect(component.locator('label')).toContainText('Label');
    await expect(component.locator('input')).toHaveValue('');
    await expect(component.locator('p')).toHaveCount(0);

    await component.locator('input').clear();
    await component.locator('input').fill('value');
    await component.locator('input').blur();

    await expect(component.locator('input')).toHaveValue('value');
  });
});
