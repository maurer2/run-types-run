import React from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UncontrolledInput from './UncontrolledInput';

import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox';

import { INGREDIENTS, DOUGH } from './constants';
import { pizzaValidationSchema } from './validation';

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
      selectedIngredients: [],
    },
    resolver: zodResolver(pizzaValidationSchema),
  });

  const onSubmit = (data: FormValues) => console.log(data);
  const watchFields: FormValues = watch();
  console.log(watchFields);

  return (
    <article className="container mx-auto h-screen bg-slate-100">
      <h1>Pizza</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="m-4">
        <UncontrolledInput htmlLabel="Id" error={errors.id} {...register('id')} />

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

        <ul className="grid grid-flow-col auto-cols-min gap-4">
          {INGREDIENTS.map((ingredient, index) => (
            <li key={ingredient} className="w-40 h-40 border bg-white">
              <UncontrolledRadioCheckbox
                htmlLabel={ingredient}
                type="checkbox"
                value={ingredient}
                error={errors.selectedIngredients as FieldError | undefined} // todo
                {...register('selectedIngredients')}
              />
              {index === INGREDIENTS.length - 1 && Boolean(errors.selectedIngredients) && (
                <p className="mt-2 text-red-500">
                  {errors.selectedIngredients?.message ?? 'Generic error'}
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <ControlledInput label="value" onChange={onChange} value={value} />
          )}
        /> */}

        <button type="submit" className="mt-4 p-2 border bg-white">
          Send
        </button>
      </form>
    </article>
  );
};

export default Pizza;
