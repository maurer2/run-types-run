'use client'

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <>
      <div className="alert alert-error shadow-lg mb-8">
        <svg
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <div>
          <h3 className="font-bold">Error</h3>
          <code className="whitespace-pre">{error.message}</code>
        </div>
      </div>
      <button
        className="btn btn-neutral normal-case"
        onClick={() => reset()}
      >
          Try again
      </button>
    </>
  );
}
