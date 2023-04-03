import useSWRMutation from 'swr/mutation';

// import type { Sending, Success, Fail } from './types';
import { sender } from '../../helpers/sender';

function useSendValues(url: string) {
  const { trigger } = useSWRMutation(url, sender);

  return { triggerSending: trigger };
}

export default useSendValues;
