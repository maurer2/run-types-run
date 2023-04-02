import React from 'react';

import type { PreloaderProps } from './types';

function Preloader<T>({ fetchingState, textLabel }: PreloaderProps<T>) {
  return (
    <>
      <h2 className="mb-4">{textLabel}</h2>

      {/* loading */}
      {fetchingState.status === 'loading' && (
        <>
          <progress className="progress w-56 mb-4 block" data-testid="progressbar-form-settings" />
          <p className="badge mb-4">is loading</p>
        </>
      )}

      {/* success */}
      {fetchingState.status === 'success' && <p className="badge badge-success mb-4">has loaded</p>}

      {/* fail */}
      {fetchingState.status === 'fail' && (
        <>
          <p className="badge badge-error mb-4">has failed</p>
          <p className="mb-8">{fetchingState.errors}</p>
        </>
      )}
    </>
  );
}

export default Preloader;
