import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { FormValues } from '../../types/pizza';

export const sendFormValues = async (url: string, payload: FormValues) => {
  const request: RequestInit = {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  }
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
