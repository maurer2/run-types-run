import Link from 'next/link';

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto px-8 py-8">
      <nav className="navbar navbar-center bg-neutral text-neutral-content">
        <Link className="btn btn-ghost normal-case text-xl" href="/pizza?min-amount=2">
          Pizza
        </Link>
        <Link className="btn btn-ghost normal-case text-xl" href="/deep-dish-pizza">
          Deep Dish Pizza
        </Link>
      </nav>
    </div>
  );
}
