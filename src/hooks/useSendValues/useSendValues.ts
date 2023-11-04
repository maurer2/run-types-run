import { useMutation } from '@tanstack/react-query';
import { stringify } from 'qs';

import type { FormValues } from '../../types/pizza';

export const sendFormValues = async (url: string, payload: FormValues) => {
  const payloadStringified = stringify(payload, {
    arrayFormat: 'brackets', // retain array type for arrays with only one entry
  });

  const request = {
    body: new URLSearchParams(payloadStringified),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    method: 'POST',
  } satisfies RequestInit;

  const response = await fetch(url, request);

  if (!response.ok) {
    throw new Error(response?.statusText || `Error sending to ${url}}`);
  }

  return response.json();
};

function useSendValues(
  key: string[],
  url: string,
  // queryKeysToInvalidate?: string[]
  handleOnSuccess: () => void,
) {
  const mutationResult = useMutation({
    mutationFn: (payload: FormValues) => sendFormValues(url, payload),
    mutationKey: key,
    onSuccess: (): void => {
      handleOnSuccess();
      // todo: invalidate fetching queries
    },
  })

  return mutationResult;
}

export default useSendValues;
