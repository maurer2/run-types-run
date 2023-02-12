import type { FormValues } from '../../types/pizza';

export const sendFormValues = (formValues: FormValues, url: string) => {
  const requestData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formValues),
  } satisfies RequestInit;

  return fetch(url, requestData);
};
