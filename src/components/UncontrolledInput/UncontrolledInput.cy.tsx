import React from 'react'
import UncontrolledInput from './UncontrolledInput'

describe('<UncontrolledInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UncontrolledInput />)
  })
})