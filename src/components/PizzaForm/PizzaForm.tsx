'use client';

import type { FormEvent } from 'react';

// import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';

import type { FormValues } from '../../types/pizza';
import type { PizzaFormProps } from './types';

import { formLabels } from '../../constants/pizza/labels';
import { sendValues } from '../../hooks/useSendValues/helpers';
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';

const PizzaForm = ({ defaultValues, formSettings }: PizzaFormProps) => {
  const router = useRouter();
  const {
    data: validationErrors,
    mutateAsync,
    reset: resetValidationErrors,
  } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      try {
        return await sendValues('/api/pizza/validate-form-values', formValues);
      } catch (error) {
        debugger
        if (error instanceof Error && Object.hasOwn(error, 'cause')) {
          return error.cause;
        }
        throw error;
      }
    },
    mutationKey: ['validation-errors'],
    onSuccess: (data: FieldErrors) => {
      // no validation errors
      if (Object.keys(data).length === 0) {
        router.push('/pizza/success');
      }
    },
  });
  const formMethods = useForm<FormValues>({
    defaultValues,
    errors: validationErrors, // https://github.com/react-hook-form/react-hook-form/pull/11188
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
  const priceRangeClassValue = watch('priceRangeClass');

  // custom validation trigger for dough and toppings when price range changes
  useEffect(() => {
    trigger(['selectedDough', 'selectedToppings']);
  }, [priceRangeClassValue, trigger]);

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    // https://github.com/vercel/next.js/discussions/51371#discussioncomment-7152123
    setIsPending(true);
    await mutateAsync(formValues);
    setIsPending(false);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    reset({ ...defaultValues });
    resetValidationErrors();
    setIsPending(false);
  };

  return (
    <FormProvider {...formMethods}>
      <form onReset={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput label={formLabels.id} name="id" type="text" />
        <div className="divider" />

        <UncontrolledInput label={formLabels.amount} name="amount" type="text" />
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

        <pre className="mt-4 mockup-code bg-primary text-primary-content">
          <code className="pl-6 whitespace-pre">
            {JSON.stringify(
              errors,
              (key, value) => {
                if (key === 'ref') {
                  return undefined;
                }
                return value;
              },
              4,
            )}
          </code>
        </pre>
      </form>
      {/* <DevTool control={control} /> */}
    </FormProvider>
  );
};

export default PizzaForm;
