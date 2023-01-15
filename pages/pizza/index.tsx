import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';

import type { FieldError } from 'react-hook-form';
import UncontrolledInput from './UncontrolledInput';

import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox';

import { INGREDIENTS, DOUGH } from './constants';

import type { FormValues } from './types';

const Pizza: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      selectedDough: DOUGH[1],
      selectedIngredients: ['tomato'],
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);
  const watchFields: FormValues = watch();
  console.log(watchFields);

  return (
    <article>
      <h1>Pizza</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="m-4">
        <UncontrolledInput
          htmlLabel="Id"
          error={errors.id}
          {...register('id', {
            required: "Field shouldn't be empty",
            minLength: {
              value: 5,
              message: 'Field should contain 5 characters',
            },
            validate: {
              noTest: (value) => !/test/.test(value) || 'Field should not contain "test"',
            },
          })}
        />

        {DOUGH.map((dough) => (
          <div key={dough}>
            <UncontrolledRadioCheckbox
              htmlLabel={dough}
              type="radio"
              error={errors.selectedDough}
              value={dough}
              {...register('selectedDough')}
            />
          </div>
        ))}

        {INGREDIENTS.map((ingredient, index) => (
          <Fragment key={ingredient}>
            <div>
              <UncontrolledRadioCheckbox
                htmlLabel={ingredient}
                type="checkbox"
                value={ingredient}
                error={errors.selectedIngredients as FieldError | undefined} // todo
                {...register('selectedIngredients', {
                  validate: {
                    minNumber: (value) =>
                      value.length !== 0 || 'At least 1 item should be selected',
                  },
                })}
              />
            </div>
            {index === INGREDIENTS.length - 1 && Boolean(errors.selectedIngredients) && (
              <p className="mt-2 text-red-500">
                {errors.selectedIngredients?.message ?? 'Generic error'}
              </p>
            )}
          </Fragment>
        ))}

        {/* <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <ControlledInput label="value" onChange={onChange} value={value} />
          )}
        /> */}

        <button type="submit" className="mt-4 p-2 border">
          Send
        </button>
      </form>
    </article>
  );
};

export default Pizza;
