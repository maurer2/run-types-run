import type { PropsWithChildren } from 'react';
import type { FieldValues} from 'react-hook-form';

import React from 'react';
import { FormProvider , useForm } from 'react-hook-form';

export const FormWrapper = <T extends FieldValues>({
  children,
  defaultValues,
}: PropsWithChildren<T>) => {
  const formMethods = useForm({
    defaultValues,
    mode: 'onChange',
  });

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};
