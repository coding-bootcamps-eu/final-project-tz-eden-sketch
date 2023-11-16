// https://on.cypress.io/api
/// <reference types="cypress"/>

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('visits the app root url', () => {
    cy.get('[data-cy="title"]').should('exist')
    cy.get('[data-cy="login"]').should('exist')
    cy.get('[data-cy="login"]').click()
    // Should be on a new URL which includes '/new-user' or /home
    cy.url().should('include', '/new-user')
  })
})

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('is possible to register as new user', () => {
    cy.get('[data-cy="registration"]').click()
    cy.get('[data-cy="input-username"]').type('Heribert{enter}')
    cy.url().should('include', '/home')
  })
  it('is possible to login as known user', () => {
    cy.get('[data-cy="login"]').click()
    cy.get('[data-cy="input-username"]').type('Heribert{enter}')
    cy.visit('/')
    cy.get('[data-cy="login"]').click()
    cy.url().should('include', '/home')
    cy.get('[data-cy="user-menu"]').click()
    cy.get('[data-cy="user-greeting"]').contains('Heribert')
    cy.get('[data-cy="user-delete"]').click()
    cy.get('[data-cy="user-delete-confirm"]').click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })
  })
})

// describe('Plantbed-Edit-View', () => {
//   beforeEach(() => {
//     cy.visit('/')
//     cy.get('[data-cy="login"]').click()
//     cy.get('[data-cy="input-username"]').type('Heribert{enter}')
//     cy.visit('/')
//     cy.get('[data-cy="login"]').click()
//   })

//   it('is possible to login as known user', () => {
//     cy.

//   })
// })
