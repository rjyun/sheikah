// https://docs.cypress.io/api/introduction/api.html
import { createSelection } from '../utils'
// TODO: remove skip in tests when new rust release is ready
describe.skip('Create Wallet', () => {
  it('Create a wallet succesfully', () => {
    // Go to ftu form when the wallet contains a created wallet
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/')
    // if (Cypress.env().is_wallet_created) {
    cy.get('[data-test=create-wallet]').click()
    // }
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=new-seed-option]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('input').type(val)
      })
    cy.get('[data-test=next-step]').click()

    cy.get('[data-test=password]')
      .first()
      .type('password')

    cy.get('[data-test=password]')
      .last()
      .type('password')

    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=home]')
  })

  it('Show error when mnemonics don´t match', () => {
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/ftu')
    cy.get('[data-test=create-wallet]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=new-seed-option]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('input').type(val + '1')
      })
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=mnemonics-error-alert]').should('have.css', 'color', 'rgb(245, 108, 108)')
  })

  it('Show error when passwords don´t match', () => {
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/ftu')
    cy.get('[data-test=create-wallet]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=new-seed-option]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('input').type(val)
      })
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=password]')
      .first()
      .type('password')
    cy.get('[data-test=password]')
      .last()
      .type('password1')
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=password-error-alert]').should('have.css', 'color', 'rgb(245, 108, 108)')
  })

  it('Show previous and next view when the button is clicked', () => {
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/ftu')
    cy.get('[data-test=create-wallet]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=new-seed-option]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('input').type(val)
      })
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=password]')
      .first()
      .type('password')
    cy.get('[data-test=password]')
      .last()
      .type('password')
    cy.get('[data-test=previous-step]').click()
    cy.get('[data-test=header-4]')
    cy.get('[data-test=previous-step]').click()
    cy.get('[data-test=header-3]')
    cy.get('[data-test=previous-step]').click()
    cy.get('[data-test=header-2]')
    cy.get('[data-test=previous-step]').click()
    cy.get('[data-test=header-1]')
  })

  it('logs out Sheikah', () => {
    cy.visit('/ftu')
    cy.get('[data-test=local-wallet]')
      .first()
      .click({ force: true })
    cy.get('[data-test=password]')
      .last()
      .type('passwor')
    cy.get('[data-test=unlock-wallet]')
      .last()
      .click()
    cy.get('[data-test=password-error-alert]').should('have.css', 'color', 'rgb(245, 108, 108)')
    cy.get('[data-test=password]')
      .last()
      .clear()
      .type('password')
    cy.get('[data-test=unlock-wallet]')
      .last()
      .click()
    cy.get('[data-test=home]')
  })
})
