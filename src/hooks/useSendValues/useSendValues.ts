import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stringify } from 'qs';

import type { FormValues } from '../../types/pizza';

export const sendFormValues = async (url: string, payload: FormValues) => {
  const payloadStringified = stringify(payload, {
    arrayFormat: 'repeat',
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
  handleOnSuccess: () => void,
  queryKeysToInvalidate?: string[],
) {
  const queryClient = useQueryClient();
  const mutationResult = useMutation({
    mutationFn: (payload: FormValues) => sendFormValues(url, payload),
    mutationKey: key,
    onSuccess: (): void => {
      handleOnSuccess();

      queryClient.invalidateQueries({
        exact: false,
        queryKey: queryKeysToInvalidate,
      });
    },
  })

  return mutationResult;
}

export default useSendValues;
