import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';

import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from '../constants';
import { pizzaValidationSchema } from '../validation';

import type { FormValues } from '../types';
import type { PizzaFormProps } from './types';

const PizzaForm = ({ formSettings }: PizzaFormProps) => {
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
    watch,
    // reset,
  } = formMethods;
  const formOutput = getValues();
  const priceRangeClassValue = watch('priceRangeClass');

  // custom validation trigger
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
    console.log(priceRangeClassValue);
  }, [priceRangeClassValue, trigger]);

  const onSubmit = (data: FormValues): void => {
    setIsShowingResults(true);
    console.log(data);
  };
  const onError = (): void => setIsShowingResults(false);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <UncontrolledInput htmlLabel="Enter your ID" error={errors.id} {...register('id')} />

        <div className="divider" />

        <UncontrolledRadioCheckbox
          type="radio"
          name="priceRangeClass"
          values={[...formSettings.priceRangeClasses]}
        />

        <div className="divider" />

        <UncontrolledRadioCheckbox
          type="radio"
          name="selectedDough"
          values={[...formSettings.doughs]}
        />

        <div className="divider" />

        <UncontrolledRadioCheckbox
          type="checkbox"
          name="selectedToppings"
          values={[...formSettings.toppings]}
        />

        <div className="divider" />

        <button type="submit" className="btn btn-wide">
          Send values
        </button>

        {isShowingResults && (
          <>
            <div className="divider" />
            <code>
              <pre>{JSON.stringify(formOutput, undefined, 4)}</pre>
            </code>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default PizzaForm;
