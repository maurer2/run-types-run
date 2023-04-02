import type { Loading, Success, Fail } from '../../hooks/useFetchValue/types';

export type PreloaderProps<T> = {
  fetchingState: Loading | Fail | Success<T>;
  textLabel: string;
};
