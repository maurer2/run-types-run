import Link from 'next/link';
import type { Route } from 'next';

const routes = [
  { path: '/pizza?min-amount=2', label: 'Pizza' },
  { path: '/deep-dish-pizza', label: 'Deep Dish Pizza' },
  // { path: '/test', label: 'Test' },
] satisfies { path: Route; label: string }[];

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto px-8 py-8">
      <nav className="navbar navbar-center bg-neutral text-neutral-content">
        {routes.map(({ path, label }) => (
          <Link key={path} className="btn btn-ghost normal-case text-xl" href={path}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
