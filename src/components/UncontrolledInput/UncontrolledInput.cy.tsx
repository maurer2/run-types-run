import React from 'react';

import { FormWrapper } from '../../../cypress/support/wrappers/FormWrapper';
import UncontrolledInput from './UncontrolledInput';

describe('UncontrolledInput', () => {
  it('renders', () => {
    cy.mount(
      <FormWrapper defaultValues=''>
        <form onSubmit={() => {}}>
          <UncontrolledInput label='Label' name="Fieldname" type='text' />);
        </form>
      </FormWrapper>,
    );

    cy.findByLabelText('Label').should('exist');
    cy.findByRole('textbox').should('exist');
    cy.findByRole('paragraph').should('not.exist');
  });

  it('should update value when typing', () => {
    cy.mount(
      <FormWrapper defaultValues=''>
        <form onSubmit={() => {}}>
          <UncontrolledInput label='Label' name="name" type='text' />);
        </form>
      </FormWrapper>,
    );

    cy.findByRole('textbox').type('value');
    cy.findByRole('textbox').should('have.value', 'value');
  });
});
