import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UncontrolledInput from './UncontrolledInput';

import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox';

import { TOPPINGS, DOUGH } from './constants';
import { pizzaValidationSchema } from './validation';

import type { FormValues } from './types';

const Pizza: NextPage = () => {
  // const [apiData, setApiData] = useState<FormValues | null>(null);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      selectedDough: DOUGH[1],
      selectedToppings: [],
    },
    resolver: zodResolver(pizzaValidationSchema),
  });

  const onSubmit = (data: FormValues) => console.log(data);
  const watchFields: FormValues = watch();
  console.log(watchFields);

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);

      const response = await fetch('/api/pizza');
      const data = await response.json();

      try {
        const validatedData = pizzaValidationSchema.parse(data) satisfies FormValues;
        // setApiData(validatedData);
        reset(validatedData, { keepDefaultValues: true });
      } catch (error) {
        reset();
        // setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [reset]);

  return (
    <article className="container mx-auto h-screen bg-slate-100">
      <h1>Pizza</h1>

      {isLoading && <span>is loading</span>}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)} className="m-4">
          <UncontrolledInput htmlLabel="Id" error={errors.id} {...register('id')} />

          <UncontrolledRadioCheckbox
            type="radio"
            error={errors.selectedDough}
            name="selectedDough"
            values={[...DOUGH]}
            register={register}
          />

          {/* <ul className="grid grid-flow-col auto-cols-min gap-4">
            {Object.entries(TOPPINGS).map(([toppingKey, toppingValue], index, arr) => (
              <li key={toppingKey} className="w-40 h-40 border bg-white">
                <UncontrolledRadioCheckbox
                  htmlLabel={toppingValue}
                  type="checkbox"
                  value={toppingValue}
                  error={errors.selectedToppings as FieldError | undefined} // todo
                  {...register('selectedToppings')}
                />
                {index === arr.length - 1 && Boolean(errors.selectedToppings) && (
                  <p className="mt-2 text-red-500">
                    {errors.selectedToppings?.message ?? 'Generic error'}
                  </p>
                )}
              </li>
            ))}
          </ul> */}

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
      )}
    </article>
  );
};

export default Pizza;
