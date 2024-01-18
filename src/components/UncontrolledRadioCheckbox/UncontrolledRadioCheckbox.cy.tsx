import React from 'react';

import { FormWrapper } from '../../../cypress/support/wrappers/FormWrapper';
import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox';

describe('UncontrolledRadioCheckbox', () => {
  it('renders', () => {
    cy.mount(
      <FormWrapper defaultValues={['one', 'two', 'three']}>
        <UncontrolledRadioCheckbox
          label="name"
          name="name"
          type="radio"
          values={['one', 'two', 'three']}
        />
      </FormWrapper>,
    );

    cy.get('legend').findByText('name').should('exist');

    cy.findByLabelText('one').should('exist');
    cy.findByLabelText('two').should('exist');
    cy.findByLabelText('three').should('exist');

    cy.findAllByDisplayValue('one').should('exist');
    cy.findAllByDisplayValue('two').should('exist');
    cy.findAllByDisplayValue('three').should('exist');
  });
});
