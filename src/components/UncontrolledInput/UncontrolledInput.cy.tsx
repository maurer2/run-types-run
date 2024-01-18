import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import UncontrolledInput from './UncontrolledInput';

describe.skip('UncontrolledInput', () => {
  it('renders', () => {
    const formMethods = useForm({
      defaultValues: {
        name: ''
      },
      mode: 'onSubmit',
    });
    const { handleSubmit, register } = formMethods;

    cy.mount(
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(() => {})}>
          <UncontrolledInput error={undefined} label='name' name="name" register={register} type='text' />);
        </form>
      </FormProvider>
    );

    // cy.mount(
    //   <FormProvider {...methods}>
    //     <UncontrolledInput label='name' name="name" register={{...methods.register('name')}} type='text'  />);
    //   </FormProvider>
    // )

    // cy.findByText('Label').should('exist');
    // cy.findByRole('textbox').should('exist');
    // cy.findAllByRole('paragraph').should('not.exist');
  });

  // it('should update value when typing', () => {
  //   cy.mount(<UncontrolledInput error={undefined} htmlLabel="Label" />);

  //   cy.findByRole('textbox').type('value');
  //   cy.findByRole('textbox').should('have.value', 'value');
  // });
});
