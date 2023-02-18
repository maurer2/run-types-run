import React from 'react'
import UncontrolledRadioCheckbox from './UncontrolledRadioCheckbox'

describe('<UncontrolledRadioCheckbox />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UncontrolledRadioCheckbox />)
  })
})