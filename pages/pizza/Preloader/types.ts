import type { Loading, Fail } from '../Hooks/types';

export type PreloaderProps = {
  fetchingState: Loading | Fail;
};
