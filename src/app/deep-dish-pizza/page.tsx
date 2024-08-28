import React from 'react';

export default async function DeepDishPizza() {
  const testServerAction1 = async () => {
    'use server';

    console.log('testServerAction 1');
  };

  const testServerAction2 = async () => {
    'use server';

    console.log('testServerAction 2');
  };

  return (
    <article className="container max-w-4xl mx-auto px-8 py-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          <h1 className="mb-4 text-2xl">Deep Dish Pizza</h1>
          <button className="btn btn-neutral normal-case" form="test-form-1" type="submit">
            Trigger server action
          </button>
          <form action={testServerAction1} id="test-form-1" />

          <hr className="my-4" />

          <form aria-label="Test Form 2" id="test-form-2">
            <button
              className="btn btn-neutral normal-case"
              formAction={testServerAction1}
              type="submit"
            >
              Trigger server action 1
            </button>

            <button
              className="btn btn-neutral normal-case"
              formAction={testServerAction2}
              type="submit"
            >
              Trigger server action 2
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
