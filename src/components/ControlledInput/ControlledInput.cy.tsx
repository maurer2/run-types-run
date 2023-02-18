import React from 'react'

import ControlledInput from './ControlledInput'

describe('<ControlledInput />', () => {
  it('renders', () => {
    const onClickHandler = cy.stub();
    cy.mount(<ControlledInput label="Label" value="value" onChange={onClickHandler} />)

    cy.findByText('Label').should('exist');
    cy.findByDisplayValue("value").should('exist');
  })
})
