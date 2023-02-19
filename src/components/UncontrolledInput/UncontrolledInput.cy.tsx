import React from 'react';

import UncontrolledInput from './UncontrolledInput';

describe('<UncontrolledInput />', () => {
  it('renders', () => {
    cy.mount(<UncontrolledInput htmlLabel="Label" error={undefined} />);

    cy.findByText('Label').should('exist');
    cy.findByRole('textbox').should('exist');
    cy.findAllByRole('paragraph').should('not.exist');
  });

  it('should update value when typing', () => {
    cy.mount(<UncontrolledInput htmlLabel="Label" error={undefined} />);

    cy.findByRole('textbox').type('value');
    cy.findByRole('textbox').should('have.value', 'value');
  });
});
