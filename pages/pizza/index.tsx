import React from 'react';
import type { NextPage } from 'next';
import { useForm, Controller } from 'react-hook-form';

import UncontrolledInput from './UncontrolledInput';
import ControlledInput from './ControlledInput';

import type { FormValues } from './types';

const Pizza: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      name: '',
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);
  const watchFields: FormValues = watch();
  // console.log(watchFields);

  return (
    <div>
      <h1>Pizza</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4">
        <UncontrolledInput
          htmlLabel="Id"
          error={errors.id}
          {...register('id', {
            required: "Field shouldn't be empty",
            minLength: {
              value: 5,
              message: 'Field should contain 5 characters',
            },
            validate: {
              noTest: (value) => !/test/.test(value) || 'Field should not contain "test"',
            },
          })}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <ControlledInput label="value" onChange={onChange} value={value} />
          )}
        />

        <button type="submit" className="mt-4 p-2 border">
          Send
        </button>
      </form>
    </div>
  );
};

export default Pizza;
