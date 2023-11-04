import { useMutation, useQueryClient } from '@tanstack/react-query';

// import type { Sending, Success, Fail } from './types';
import { sender } from '../../helpers/sender';
import type { FormValues } from '../../types/pizza';

function useSendValues(
  key: string[],
  url: string,
  // queryKeysToInvalidate?: string[]
  handleOnSuccess: () => void,
) {
  const mutationResult = useMutation({
    mutationKey: key,
    mutationFn: (payload: FormValues) => sender(url, payload),
    onSuccess: () => {
      handleOnSuccess();
      // todo: invalidate fetching queries
    },
  })

  return mutationResult;
}

export default useSendValues;
