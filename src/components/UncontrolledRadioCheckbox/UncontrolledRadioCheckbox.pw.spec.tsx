import { expect, test } from '@playwright/experimental-ct-react';

import UncontrolledRadioCheckbox from '.';

test.describe.skip('UncontrolledRadioCheckbox', () => {
  test('default', async ({ mount }) => {
    const component = await mount(
      <UncontrolledRadioCheckbox
        label='Label'
        name='Name'
        type='radio'
        values={['one, two, three']}
      />
    );

    await expect(component.getByText('Label')).toHaveCount(1);
    await expect(component.locator('legend')).toContainText('Label');
    await expect(component.locator('input')).toHaveValues(['one, two, three']);
    await expect(component.locator('.label-text')).toHaveValues(['one, two, three']);
  });
});
