import React from 'react'
import PizzaForm from './PizzaForm'

describe('<PizzaForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PizzaForm />)
  })
})