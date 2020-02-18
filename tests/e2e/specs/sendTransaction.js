import { createSelection } from '../utils'
// TODO: remove skip in tests when new rust release is ready
describe.skip('Create a complete Send transactions flow', () => {
  it('Redirects to home view', () => {
    cy.createAndUnlockWallet()
    cy.get('[data-test=to-transactions]').click()
    cy.get('[data-test=transactions]')
  })

  it('Add Addresses correctly', () => {
    cy.get('[data-test=receive-btn]').click()
    cy.get('[data-test=receive-modal]')
  })

  it('Copies last address generated and fill the send tx form', () => {
    cy.get('[data-test=last-address]')
      .click()
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('.el-dialog__headerbtn')
          .last()
          .click({ force: true })
        cy.get('[data-test=send-btn]').click()
        cy.get('[data-test=tx-address]')
          .click()
          .clear()
          .type('twit1rhr2j4smwaskm3trn3e2xfvm2eur508g687gh9')
      })
    cy.get('[data-test=tx-label]')
      .last()
      .click()
      .type('hola')
    cy.get('[data-test=tx-amount]')
      .last()
      .click()
      .clear()
      .type('1')
    cy.get('[data-test=select-btn]').click()
    cy.get('[data-test=option-2]').click()
    cy.get('[data-test=sign-send-btn]').click()
  })

  // IF there is not enough balance
  it('Shows error when sending transactions', () => {
    cy.get('[data-test=alert]')
  })

  it('Closes the modal', () => {
    cy.get('.el-dialog__headerbtn')
      .first()
      .click({ force: true })
  })
})
