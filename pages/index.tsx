import type { NextPage } from 'next';

import Link from 'next/link';

const Home: NextPage = () => (
  <div className="container max-w-4xl mx-auto px-8 pt-8">
    <div className="navbar navbar-center bg-neutral text-neutral-content">
      <Link className="btn btn-ghost normal-case text-xl" href="/pizza">
        Pizza
      </Link>
    </div>
  </div>
);

export default Home;
