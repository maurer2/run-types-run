import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';

import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox'

describe('<UncontrolledRadioCheckbox />', () => {
  it('renders', () => {
    // const formMethods = useForm({
    //   defaultValues: {
    //     name: ['one', two', 'three'],
    //   },
    //   mode: 'onChange',
    // });

    const getFieldStateMock = cy.stub().returns(true);
    const registerMock = cy.stub();

    cy.mount(
      <FormProvider getFieldState={getFieldStateMock} register={registerMock}>
        <UncontrolledRadioCheckbox type='radio' name="name" values={['one', 'two', 'three']} />
      </FormProvider>
    );

    cy.findByText('Select name').should('exist');

    cy.findByLabelText('one').should('exist');
    cy.findByLabelText('two').should('exist');
    cy.findByLabelText('three').should('exist');

    cy.findAllByDisplayValue('one').should('exist');
    cy.findAllByDisplayValue('two').should('exist');
    cy.findAllByDisplayValue('three').should('exist');
  })
})
