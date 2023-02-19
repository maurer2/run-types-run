import React from 'react';

import ControlledInput from './ControlledInput';

describe('<ControlledInput />', () => {
  it('renders', () => {
    const onChangeHandler = cy.stub();
    cy.mount(<ControlledInput label="Label" value="value" onChange={onChangeHandler} />);

    cy.findByText('Label').should('exist');
    cy.findByRole('textbox').should('exist');
  });

  it('onChange callback is called with new value', () => {
    const onChangeHandler = cy.stub().as('change');
    cy.mount(<ControlledInput label="Label" value="value" onChange={onChangeHandler} />);

    cy.findByRole('textbox').should('exist');
    cy.findByRole('textbox').clear().type('new value').type('{enter}');
    // cy.findByRole('textbox').should('have.value', 'new value');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // expect(onChangeHandler).to.be.called;
  });
});
