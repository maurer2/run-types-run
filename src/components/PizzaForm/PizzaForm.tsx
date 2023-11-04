import React, { useEffect } from 'react';
import type { FormEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import { apiRoutes } from '../../constants/pizza/urls';
import useSendValues from '../../hooks/useSendValues/useSendValues';

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
  const router = useRouter();
  const {
    isError: isErrorMutation,
    isPending: isPendingMutation,
    mutate,
    error: errorMutation,
    reset: resetMutation,
  } = useSendValues(['pizza', 'form-results'], apiRoutes.userData, () => {
    router.push('/pizza/success');
  });

  const priceRangeClassValue = watch('priceRangeClass');

  // custom validation trigger for dough and toppings when price range changes
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
  }, [priceRangeClassValue, trigger]);

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    mutate(formValues);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    reset({ ...defaultValues });
    resetMutation();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
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

        <div className="join">
          <button type="reset" className="btn btn-neutral normal-case join-item">
            Reset
          </button>
          <button
            type="submit"
            aria-disabled={!isValid || !isPendingMutation}
            className={clsx('btn btn-neutral normal-case join-item', {
              'cursor-wait': isPendingMutation,
              'btn-disabled': !isValid || isPendingMutation,
              'cursor-not-allowed': !isValid || isPendingMutation,
            })}
          >
            {isPendingMutation && <span className="loading loading-spinner" />}
            Send
          </button>
        </div>

        {isErrorMutation && (
          <div className="alert alert-warning shadow-lg mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{errorMutation ? errorMutation.message : 'Error'}</span>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default PizzaForm;
