import React from 'react';

import type { PreloaderProps } from './types';

function Preloader<T>({ fetchingState, textLabel }: PreloaderProps<T>) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4 mb-4">
      <h2>{textLabel}</h2>
      {/* loading */}
      {fetchingState.status === 'loading' && (
        <div className="flex flex-1 gap-4 items-center">
          <p className="badge">is loading</p>
          <progress className="progress w-56 block" data-testid="progressbar-form-settings" />
        </div>
      )}

      {/* success */}
      {fetchingState.status === 'success' && <p className="badge badge-success">has loaded</p>}

      {/* fail */}
      {fetchingState.status === 'fail' && (
        <div>
          <p className="badge badge-error mb-4">has failed</p>
          <p>{fetchingState.errors}</p>
        </div>
      )}
    </div>
  );
}

export default Preloader;
