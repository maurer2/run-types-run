'use client'

import type { FormEvent } from 'react';

// import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import React, { useEffect , useState, } from 'react';
import { type FieldErrors, FormProvider, useForm} from 'react-hook-form';

import type { FormValues } from '../../types/pizza';
import type { PizzaFormProps } from './types';

import { handleFormValuesSubmit } from '../../app/actions/handleFormValuesSubmit/handleFormValuesSubmit';
import { formLabels } from '../../constants/pizza/labels'
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import UncontrolledInput from '../UncontrolledInput';
import UncontrolledRadioCheckbox from '../UncontrolledRadioCheckbox';

const PizzaForm = ({ defaultValues, formSettings }: PizzaFormProps) => {
  const [serverSideErrors, setServerSideErrors] = useState<FieldErrors<FormValues>>({});
  const formMethods = useForm<FormValues>({
    defaultValues,
    errors: serverSideErrors, // https://github.com/react-hook-form/react-hook-form/pull/11188
    mode: 'onChange',
    resolver: zodResolver(pizzaFormValidationSchema)
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

    const newServerSideErrors = await handleFormValuesSubmit(formValues);

    setIsPending(false);
    setServerSideErrors(newServerSideErrors);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    reset({ ...defaultValues });
    setIsPending(false);
    setServerSideErrors({});
  };

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

        <pre className='mt-4 mockup-code bg-primary text-primary-content'>
          <code className="pl-6 whitespace-pre">{JSON.stringify(errors, null, 4)}</code>
        </pre>
      </form>
      {/* <DevTool control={control} /> */}
    </FormProvider>
  );
};

export default PizzaForm;
