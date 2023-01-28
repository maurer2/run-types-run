import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UncontrolledInput from './UncontrolledInput';

import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox';

import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from './constants';
import { pizzaValidationSchema } from './validation';

import type { FormValues } from './types';
import PizzaForm from './PizzaForm';

const Pizza: NextPage = () => {
  // const [apiData, setApiData] = useState<FormValues | null>(null);
  const [isLoading, setLoading] = useState(false);

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
    <article className="container max-w-4xl mx-auto px-8 pt-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          <PizzaForm />
        </div>
      </div>
    </article>
  );
};

export default Pizza;
