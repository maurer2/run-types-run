import React from 'react'
import ControlledInput from './ControlledInput'

describe('<ControlledInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ControlledInput />)
  })
})
