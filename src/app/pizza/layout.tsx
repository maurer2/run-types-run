import type { ReactNode } from 'react';

export default function PizzaLayout({ children }: { children: ReactNode }) {
  return (
    <article className="container max-w-4xl mx-auto px-8 py-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          {children}
        </div>
      </div>
    </article>
  );
}
