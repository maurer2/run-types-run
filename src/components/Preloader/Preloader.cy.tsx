import React from 'react'
import Preloader from './Preloader'

describe('<Preloader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Preloader />)
  })
})