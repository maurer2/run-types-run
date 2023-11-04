// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@playwright/experimental-ct-react';

// import { renderHook, act } from "@testing-library/react-hooks";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';

import Component from '.';
// import type { FormValues } from './types';
// import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from './constants';
// import { pizzaValidationSchema } from './validation';

// const Wrapper = (startValues?: FormValues) => (
//     <FormProvider {...formMethods}>
//       <Component
//         type="radio"
//         name="priceRangeClass"
//         values={[...PRICE_RANGE_CLASS]}
//       />
//     </FormProvider>
//   );

test.describe(() => {
  test('has child components', async ({ mount, page }) => {
    await mount(<Component />);

    await expect(page.getByTestId('id-priceRangeClass')).toHaveCount(3);
    await expect(page.getByTestId('id-selectedDough')).toHaveCount(3);
    await expect(page.getByTestId('id-selectedToppings')).toHaveCount(11);
    await expect(page.getByRole('button', { name: 'Send' })).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit');
  });

  test('should show errors on submit', async ({ mount, page }) => {
    const component = await mount(<Component />);

    // priceClass
    await page.getByLabel('Budget').check();
    expect(await page.getByLabel('Budget').isChecked()).toBeTruthy();

    // selectedDough
    await page.getByLabel('Italian').check();
    expect(await page.getByLabel('Italian').isChecked()).toBeTruthy();

    // selectedToppings
    await page.getByLabel('Tomato').check();
    expect(await page.getByLabel('Tomato').isChecked()).toBeTruthy();
    await page.getByLabel('Pineapple').check();
    expect(await page.getByLabel('Pineapple').isChecked()).toBeTruthy();
    await page.getByLabel('Pepperoni').check();
    expect(await page.getByLabel('Pepperoni').isChecked()).toBeTruthy();

    // submit
    await page.getByRole('button', { name: 'Send' }).click();

    // errors
    await expect(component).toContainText(
      `"Italian" dough can't be selected, when "Budget" option is selected`,
    );
    await expect(component).toContainText(
      `Only 2 toppings can be selected, when "Budget" class is selected`,
    );
  });
});
