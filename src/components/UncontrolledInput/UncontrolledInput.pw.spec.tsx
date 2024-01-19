import { expect, test } from '@playwright/experimental-ct-react';

import ControlledInput from '.';
import { FormWrapper } from '../../../playwright/wrappers/FormWrapper';

test.describe('UncontrolledInput', () => {
  test('default', async ({ mount }) => {
    const component = await mount(
      <FormWrapper>
        <ControlledInput
          label="Label"
          name="Fieldname"
        />
      </FormWrapper>
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
