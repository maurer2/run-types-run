import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendValues } from './helpers';

function useSendValues<T>(
  key: string[],
  url: string,
  handleOnSuccess: () => void,
  queryKeysToInvalidate?: string[],
) {
  const queryClient = useQueryClient();
  const mutationResult = useMutation({
    mutationFn: (payload: T) => sendValues(url, payload),
    mutationKey: key,
    onSuccess: (): void => {
      handleOnSuccess();

      if (!queryKeysToInvalidate?.length) {
        return;
      }

      queryClient.invalidateQueries({
        exact: false,
        queryKey: queryKeysToInvalidate,
      });
    },
  });

  return mutationResult;
}

export default useSendValues;
