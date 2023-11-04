import type { Fail, Loading, Success } from '../../hooks/useFetchValue/types';

export type PreloaderProps<T> = {
  fetchingState: Fail | Loading | Success<T>;
  textLabel: string;
};
