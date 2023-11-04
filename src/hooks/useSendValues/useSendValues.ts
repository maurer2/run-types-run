import { useMutation } from '@tanstack/react-query';

import { stringify } from 'qs';
import type { FormValues } from '../../types/pizza';

export const sendFormValues = async (url: string, payload: FormValues) => {
  const payloadStringified = stringify(payload, {
    arrayFormat: 'brackets', // retain array type for arrays with only one entry
  });

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams(payloadStringified),
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
    mutationKey: key,
    mutationFn: (payload: FormValues) => sendFormValues(url, payload),
    onSuccess: (): void => {
      handleOnSuccess();
      // todo: invalidate fetching queries
    },
  })

  return mutationResult;
}

export default useSendValues;
