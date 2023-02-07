import React from 'react';

import type { PreloaderProps } from './types';

const Preloader = ({ fetchingState }: PreloaderProps) => (
  <div>
    <p>Loading form settings</p>
    {fetchingState.status === 'loading' && fetchingState.progress.formSettings && (
      <progress className="progress w-56 mt-4 mb-4" />
    )}
    {fetchingState.status === 'loading' && !fetchingState.progress.formSettings && (
      <p className="badge badge-success mb-4">has Loaded</p>
    )}
    {fetchingState.status === 'fail' && fetchingState.error.formSettings && (
      <p className="badge badge-error mb-4">has Loaded</p>
    )}

    <p>Loading default values</p>
    {fetchingState.status === 'loading' && fetchingState.progress.defaultValues && (
      <progress className="progress w-56 mt-4 mb-4" />
    )}
    {fetchingState.status === 'loading' && !fetchingState.progress.defaultValues && (
      <p className="badge badge-success mb-4">has Loaded</p>
    )}
    {fetchingState.status === 'fail' && fetchingState.error.defaultValues && (
      <p className="badge badge-error mb-4">has Loaded</p>
    )}
  </div>
);

export default Preloader;
