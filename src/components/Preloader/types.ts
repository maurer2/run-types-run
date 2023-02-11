import type { Loading, Fail } from '../../hooks/useFetchStartValues/types';

export type PreloaderProps = {
  fetchingState: Loading | Fail;
};
