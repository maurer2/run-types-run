import React from 'react';

import Success from './success';

describe('<Success />', () => {
  it('renders', () => {
    cy.mount(<Success />);

    cy.findByRole('img').should('exist');
    cy.findByText('Data has been saved on the server.').should('exist');
    cy.findByRole('link').should('exist');
  });
});
