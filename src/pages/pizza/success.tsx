import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Success: NextPage = () => (
  <article className="container max-w-4xl mx-auto px-8 pt-8">
    <div className="mockup-window border border-base-300">
      <div className="px-4 py-16 bg-base-200">
        <div className="alert alert-success shadow-lg mb-8">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              role="img"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Data has been saved on the server.</span>
          </div>
        </div>
        <Link className="btn btn-neutral btn-wide normal-case" href="/pizza">
          Go back
        </Link>
      </div>
    </div>
  </article>
);

export default Success;
