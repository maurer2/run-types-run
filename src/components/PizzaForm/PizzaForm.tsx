'use client'

import type { FormEvent } from 'react';

// import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import React, { useEffect , useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { FormValues } from '../../types/pizza';
import type { PizzaFormProps } from './types';

import { handleFormValuesSubmit } from '../../app/actions/handleFormValuesSubmit/handleFormValuesSubmit';
import { formLabels } from '../../constants/pizza/labels'
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
    // formState error object needs to be subscribed to so that getFieldState errors trigger a rerender: https://github.com/orgs/react-hook-form/discussions/7638
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isValid },
    handleSubmit,
    reset,
    trigger,
    watch,
  } = formMethods;
  const [isPending, setIsPending] = useState(false);
  const [serverSideErrors, setServerSideErrors] = useState<Record<string, string[]>|undefined>(undefined); // todo: improve typings

  const priceRangeClassValue = watch('priceRangeClass');

  // custom validation trigger for dough and toppings when price range changes
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
  }, [priceRangeClassValue, trigger]);

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    // https://github.com/vercel/next.js/discussions/51371#discussioncomment-7152123
    setIsPending(true);

    const currentServerSideErrors = await handleFormValuesSubmit(formValues);

    setIsPending(false);
    setServerSideErrors(currentServerSideErrors?.errors);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    reset({ ...defaultValues });
    setIsPending(false);
    setServerSideErrors(undefined);
  };

  const hasServerSideErrors = serverSideErrors !== undefined && (
    Object.hasOwn(serverSideErrors, 'amount')
    || Object.hasOwn(serverSideErrors, 'id')
    || Object.hasOwn(serverSideErrors, 'priceRangeClass')
    || Object.hasOwn(serverSideErrors, 'selectedDough')
    || Object.hasOwn(serverSideErrors, 'selectedToppings')
  );

  return (
    <FormProvider {...formMethods}>
      <form onReset={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput
          label={formLabels.id}
          name="id"
          type="text"
        />
        <div className="divider" />

        <UncontrolledInput
          label={formLabels.amount}
          name="amount"
          type="text"
        />
        <div className="divider" />

        <UncontrolledRadioCheckbox
          label={formLabels.priceRangeClass}
          name="priceRangeClass"
          options={formSettings.priceRangeClasses}
          type="radio"
        />
        <div className="divider" />

        <UncontrolledRadioCheckbox
          label={formLabels.selectedDough}
          name="selectedDough"
          options={formSettings.doughs}
          type="radio"
        />
        <div className="divider" />

        <UncontrolledRadioCheckbox
          label={formLabels.selectedToppings}
          name="selectedToppings"
          options={formSettings.toppings}
          type="checkbox"
        />
        <div className="divider" />

        <div className="join">
          <button className="btn btn-neutral normal-case join-item" type="reset">
            Reset
          </button>
          <button
            aria-disabled={!isValid || !isPending}
            className={clsx('btn btn-neutral normal-case join-item', {
              'btn-disabled': !isValid || isPending,
              'cursor-not-allowed': !isValid || isPending,
              'cursor-wait': isPending,
            })}
            type="submit"
          >
            {isPending && <span className="loading loading-spinner" />}
            Send
          </button>
        </div>

        {hasServerSideErrors && (
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
            <code className="whitespace-pre">{JSON.stringify(serverSideErrors, null, 4)}</code>
          </div>
        )}
      </form>
      {/* <DevTool control={control} /> */}
    </FormProvider>
  );
};

export default PizzaForm;
