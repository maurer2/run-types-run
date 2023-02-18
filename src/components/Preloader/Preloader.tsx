import React from 'react';

import type { PreloaderProps } from './types';

const Preloader = ({ fetchingState }: PreloaderProps) => (
  <>
    <h2 className="mb-4">Form settings</h2>
    {fetchingState.status === 'loading' && fetchingState.progress.formSettings && (
      <>
        <progress className="progress w-56 mb-4 block" data-testid="progressbar-form-settings" />
        <p className="badge mb-4">is loading</p>
      </>
    )}
    {fetchingState.status === 'loading' && !fetchingState.progress.formSettings && (
      <p className="badge badge-success mb-4">has loaded</p>
    )}
    {fetchingState.status === 'fail' && fetchingState.error.formSettings && (
      <p className="badge badge-error mb-4">has failed loading</p>
    )}

    <h2 className="mb-4">Default values</h2>
    {fetchingState.status === 'loading' && fetchingState.progress.defaultValues && (
      <>
        <progress className="progress w-56 mb-4 block" data-testid="progressbar-default-values"/>
        <p className="badge mb-4">is loading</p>
      </>
    )}
    {fetchingState.status === 'loading' && !fetchingState.progress.defaultValues && (
      <p className="badge badge-success mb-4">has loaded</p>
    )}
    {fetchingState.status === 'fail' && fetchingState.error.defaultValues && (
      <p className="badge badge-error mb-4"> has failed loading</p>
    )}
  </>
);

export default Preloader;
