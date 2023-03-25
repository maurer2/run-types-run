import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import { sendFormValues } from './utils';
import { apiRoutes } from '../../constants/pizza/urls';

import type { FormValues } from '../../types/pizza';
import type { PizzaFormProps } from './types';

const PizzaForm = ({ formSettings, defaultValues }: PizzaFormProps) => {
  const formMethods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(pizzaFormValidationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    reset,
  } = formMethods;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const router = useRouter();

  const priceRangeClassValue = watch('priceRangeClass');

  // custom validation trigger
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
  }, [priceRangeClassValue, trigger]);

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    try {
      setIsSubmitting(true);
      setShowErrorMessage(false);

      const response = await sendFormValues(formValues, apiRoutes.userData);
      if (response.ok) {
        await response.json();
        router.push('/pizza/success');

        return;
      }
      throw new Error('Error sending data');
    } catch (e) {
      setShowErrorMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // validation error
  const onError = (): void => {};

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    reset({ ...defaultValues });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit, onError)} onReset={handleReset}>
        <UncontrolledInput htmlLabel="Enter your ID" error={errors.id} {...register('id')} />

        <div className="divider" />

        <UncontrolledInput htmlLabel="Enter amount" error={errors.amount} {...register('amount')} />

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

        <button type="reset" className="btn btn-outline normal-case mr-4">
          Reset
        </button>

        <button
          type="submit"
          aria-disabled={!isValid}
          className={clsx('btn btn-wide normal-case', {
            loading: isSubmitting,
            'cursor-wait': isSubmitting,
            'btn-disabled': !isValid && !isSubmitting,
            'cursor-not-allowed': !isValid && !isSubmitting,
          })}
        >
          Send values
        </button>

        {showErrorMessage && (
          <div className="alert alert-warning shadow-lg mt-8">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Server error</span>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default PizzaForm;
