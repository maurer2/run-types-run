import { expect, test } from '@playwright/experimental-ct-react';

import type { Fail, Loading, Success } from '../../hooks/useFetchValue/types';

import Preloader from '.';

test.use({ viewport: { height: 500, width: 500 } });

export const loadingState: Loading = {
  status: 'loading'
};

const payload = 'test'
type Payload = typeof payload;
export const successState: Success<Payload> = {
  payload: 'test',
  status: 'success'
};

export const failState: Fail = {
  errors: 'Error 500',
  status: 'fail'
};

test.describe('Preloader states', () => {
  test('loading state', async ({ mount }) => {
    const component = await mount(<Preloader fetchingState={loadingState} textLabel='Label' />);

    await expect(component.getByText('Label')).toHaveCount(1);
    await expect(component.locator('progress')).toHaveCount(1);
    await expect(component.getByText('is loading')).toHaveCount(1);
  });

  test('success state', async ({ mount }) => {
    const component = await mount(<Preloader fetchingState={successState} textLabel='Label' />);

    await expect(component.getByText('Label')).toHaveCount(1);
    await expect(component.locator('progress')).not.toHaveCount(1);
    await expect(component.getByText('has loaded')).toHaveCount(1);
  });

  test('fail state', async ({ mount }) => {
    const component = await mount(<Preloader fetchingState={failState} textLabel='Label' />);

    await expect(component.getByText('Label')).toHaveCount(1);
    await expect(component.locator('progress')).not.toHaveCount(1);
    await expect(component.getByText('has failed')).toHaveCount(1);
    await expect(component.getByText('Error 500')).toHaveCount(1);
  });
});
