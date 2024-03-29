import Link from 'next/link';
import React from 'react';

export default function Success() {
  return (
    <>
      <div className="alert alert-success shadow-lg mb-8">
        <svg
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <span>Data has been saved on the server.</span>
      </div>
      <Link className="btn btn-neutral btn-wide normal-case" href="/pizza">
        Go back
      </Link>
    </>
  )
};
