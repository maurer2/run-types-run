import React from 'react';

import Success from "./pagepages/app/pizza/success/success";

describe('Success page', () => {
  it('renders', () => {
    cy.mount(<Success />);

    cy.findByRole('img').should('exist');
    cy.findByText('Data has been saved on the server.').should('exist');
    cy.findByRole('link').should('exist');
  });

  it('the "Go back" link back should redirect to overview page', () => {
    cy.mount(<Success />);

    cy.findByRole('link').should('have.attr', 'href').and('include', 'pizza');
  });
});
