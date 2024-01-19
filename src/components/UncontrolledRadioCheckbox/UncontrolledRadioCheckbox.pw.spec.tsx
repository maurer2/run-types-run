import { expect, test } from '@playwright/experimental-ct-react';

import UncontrolledRadioCheckbox from '.';
import { FormWrapper } from '../../../playwright/wrappers/FormWrapper';

test.describe('UncontrolledRadioCheckbox', () => {
  test('default', async ({ mount }) => {
    const component = await mount(
      <FormWrapper>
        <UncontrolledRadioCheckbox
          label='Label'
          name='Fieldname'
          options={['one', 'two', 'three']}
          type='checkbox'
        />
      </FormWrapper>
    );

    await expect(component.getByText('Label')).toHaveCount(1);
    await expect(component.locator('legend')).toContainText('Label');
    await expect(component.locator('p')).toHaveCount(0);
    await expect(component.locator('input')).toHaveCount(3);
  });
});
