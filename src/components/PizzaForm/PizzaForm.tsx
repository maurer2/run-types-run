import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';

import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';
import { pizzaValidationSchema } from '../../schema/pizza/validation';

import type { FormValues } from '../../types/pizza';
import type { PizzaFormProps } from './types';

const PizzaForm = ({ formSettings, defaultValues }: PizzaFormProps) => {
  const formMethods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(pizzaValidationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    // reset,
  } = formMethods;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceRangeClassValue = watch('priceRangeClass');

  // custom validation trigger
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
  }, [priceRangeClassValue, trigger]);

  const sendFormValues = (formValues: FormValues) => {
    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    } satisfies RequestInit;

    return fetch('/api/pizza/user-data', requestData);
  };

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    try {
      setIsSubmitting(true);

      const response = await sendFormValues(formValues);
      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (e) {
      // todo
    } finally {
      setIsSubmitting(false);
    }
  };
  const onError = (): void => {};

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

        <button
          type="submit"
          aria-disabled={!isValid}
          className={clsx('btn btn-wide', {
            loading: isSubmitting,
            'cursor-wait': isSubmitting,
            'btn-disabled': !isValid && !isSubmitting,
            'cursor-not-allowed': !isValid && !isSubmitting,
          })}
        >
          Send values
        </button>
      </form>
    </FormProvider>
  );
};

export default PizzaForm;
