import React from 'react'
import Success from './success'

describe('<Success />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Success />)
  })
})