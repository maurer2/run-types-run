import { expect, test } from '@playwright/experimental-ct-react';

import Component from '.';

test.describe.skip(() => {
  test('test', async ({ mount }) => {
    const component = await mount(<Component name="name" type='radio' values={['one, two, three']} />);

    await expect(component.locator('legend')).toContainText('Select name');
    await expect(component.locator('label')).toHaveCount(2);
    await expect(component.locator('input')).toHaveValues(['one, two, three']);
    await expect(component.locator('.label-text')).toHaveValues(['one, two, three']);
  });
});
