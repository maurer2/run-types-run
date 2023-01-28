import React, { useState, useEffect, } from 'react';
import type { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UncontrolledInput from './UncontrolledInput';

import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox';

import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from './constants';
import { pizzaValidationSchema } from './validation';

import type { FormValues } from './types';

const Pizza: NextPage = () => {
  // const [apiData, setApiData] = useState<FormValues | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      id: 'Testuser',
      priceRangeClass: PRICE_RANGE_CLASS[0],
      selectedDough: DOUGH[0],
      selectedToppings: [TOPPINGS[2]],
    },
    mode: 'onChange',
    resolver: zodResolver(pizzaValidationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    watch
    // reset,
  } = formMethods;
  const formOutput = getValues();
  const priceRangeClassValue = watch("priceRangeClass");

  // custom validation trigger
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
    console.log(priceRangeClassValue)
  }, [priceRangeClassValue, trigger]);

  const onSubmit = (data: FormValues): void => {
    setIsShowingResults(true);
    console.log(data);
  };
  const onError = (): void => setIsShowingResults(false);

  // useEffect(() => {
  //   const fetchApiData = async () => {
  //     setLoading(true);

  //     const response = await fetch('/api/pizza');
  //     const data = await response.json();

  //     try {
  //       const validatedData = pizzaValidationSchema.parse(data) satisfies FormValues;
  //       // setApiData(validatedData);
  //       reset(validatedData, { keepDefaultValues: true });
  //     } catch (error) {
  //       reset();
  //       // setApiData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchApiData();
  // }, [reset]);

  return (
    <article className="container mx-auto h-screen bg-slate-100">
      <h1>Pizza</h1>

      {isLoading && <span>is loading</span>}

      {!isLoading && (
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="[&>*]:mt-4 p-4">
            <UncontrolledInput htmlLabel="Id" error={errors.id} {...register('id')} />

            <UncontrolledRadioCheckbox
              type="radio"
              name="priceRangeClass"
              values={[...PRICE_RANGE_CLASS]}
            />

            <UncontrolledRadioCheckbox
              type="radio"
              name="selectedDough"
              values={[...DOUGH]}
            />

            <UncontrolledRadioCheckbox
              type="checkbox"
              name="selectedToppings"
              values={[...TOPPINGS]}
            />

            {/* <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <ControlledInput label="value" onChange={onChange} value={value} />
            )}
            /> */}

            <button type="submit" className="px-4 py-2 border bg-white">
              Send
            </button>

            {isShowingResults && (
              <code>
                <h2>Last successful submit:</h2>
                <pre>{JSON.stringify(formOutput, undefined, 4)}</pre>
              </code>
            )}
          </form>
        </FormProvider>
      )}
    </article>
  );
};

export default Pizza;
