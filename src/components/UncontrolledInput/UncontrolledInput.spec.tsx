import { test, expect } from '@playwright/experimental-ct-react';
// import type { FieldError } from 'react-hook-form';

import Component from '.';

test.describe(() => {
  test('test', async ({ mount }) => {
    const component = await mount(<Component htmlLabel="Label" error={undefined} />);

    await expect(component.locator('label')).toContainText('Label');
    await expect(component.locator('input')).toHaveValue('');
    await expect(component.locator('p')).toHaveCount(0);

    await component.locator('input').clear();
    await component.locator('input').fill('value');
    await component.locator('input').blur();

    await expect(component.locator('input')).toHaveValue('value');
  });
});
