import React from 'react';

import UncontrolledInput from './UncontrolledInput';

describe('<UncontrolledInput />', () => {
  it('renders', () => {
    cy.mount(<UncontrolledInput error={undefined} htmlLabel="Label" />);

    cy.findByText('Label').should('exist');
    cy.findByRole('textbox').should('exist');
    cy.findAllByRole('paragraph').should('not.exist');
  });

  it('should update value when typing', () => {
    cy.mount(<UncontrolledInput error={undefined} htmlLabel="Label" />);

    cy.findByRole('textbox').type('value');
    cy.findByRole('textbox').should('have.value', 'value');
  });
});
