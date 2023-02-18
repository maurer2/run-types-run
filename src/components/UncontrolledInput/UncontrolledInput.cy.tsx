import React from 'react'

import UncontrolledInput from './UncontrolledInput'

describe('<UncontrolledInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UncontrolledInput htmlLabel="Label" error={undefined} />)

    cy.findByText('Label').should('exist');
    cy.findByDisplayValue("").should('exist');
    cy.findAllByRole("paragraph").should('not.exist');

    cy.findByDisplayValue("").type('value');
    cy.findByDisplayValue("value").should('exist');
  })
})
