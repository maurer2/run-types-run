import React from 'react';

export default async function DeepDishPizza() {
  const testServerAction = async () => {
    'use server';

    console.log('test');
  };

  return (
    <article className="container max-w-4xl mx-auto px-8 py-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          <h1 className="mb-4 text-2xl">Deep Dish Pizza</h1>
          <button className="btn btn-neutral normal-case" form="test-form" type="submit">
            Trigger server action
          </button>
          <form action={testServerAction} id="test-form" />
        </div>
      </div>
    </article>
  );
}
