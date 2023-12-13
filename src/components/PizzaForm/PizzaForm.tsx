'use client'

import type { FormEvent } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { FormValues } from '../../types/pizza';
import type { PizzaFormProps } from './types';

import { storeFormValues } from '../../actions/storeFormValues';
import { formLabels } from '../../constants/pizza/labels'
import { apiRoutes } from '../../constants/pizza/urls';
import useSendValues from '../../hooks/useSendValues/useSendValues';
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';

const PizzaForm = ({ defaultValues, formSettings }: PizzaFormProps) => {
  const formMethods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(pizzaFormValidationSchema),
  });
  const {
    formState: { defaultValues: defaultValuesOfForm, errors, isValid },
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
  } = formMethods;
  const router = useRouter();
  const {
    error: errorMutation,
    isError: isErrorMutation,
    isPending: isPendingMutation,
    mutate,
    reset: resetMutation,
  } = useSendValues(['pizza', 'form-results'], apiRoutes.userData, () => {
    router.push('/pizza/success');
  }, ['pizza']);

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
      <form onReset={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput error={errors.id} label={formLabels.id} name='id' register={register} />

        <div className="divider" />

        <UncontrolledInput error={errors.amount} label={formLabels.amount} name='amount' register={register} />

        <div className="divider" />

        <UncontrolledRadioCheckbox
          label={formLabels.priceRangeClass}
          name="priceRangeClass"
          type="radio"
          values={[...formSettings.priceRangeClasses]}
        />

        <div className="divider" />

        <UncontrolledRadioCheckbox
          label={formLabels.selectedDough}
          name="selectedDough"
          type="radio"
          values={[...formSettings.doughs]}
        />

        <div className="divider" />

        <UncontrolledRadioCheckbox
          label={formLabels.selectedToppings}
          name="selectedToppings"
          type="checkbox"
          values={[...formSettings.toppings]}
        />

        <div className="divider" />

        <div className="join">
          <button className="btn btn-neutral normal-case join-item" type="reset">
            Reset
          </button>
          <button
            aria-disabled={!isValid || !isPendingMutation}
            className={clsx('btn btn-neutral normal-case join-item', {
              'btn-disabled': !isValid || isPendingMutation,
              'cursor-not-allowed': !isValid || isPendingMutation,
              'cursor-wait': isPendingMutation,
            })}
            type="submit"
          >
            {isPendingMutation && <span className="loading loading-spinner" />}
            Send
          </button>
          <button
            className="btn btn-neutral normal-case join-item"
            onClick={async () => {
              storeFormValues(defaultValuesOfForm);
            }}
            type="button">
            Trigger server action
          </button>
        </div>

        {isErrorMutation && (
          <div className="alert alert-warning shadow-lg mt-8">
            <svg
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>{errorMutation?.message || 'Error'}</span>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default PizzaForm;
