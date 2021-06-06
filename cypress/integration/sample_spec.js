describe('My first test', () => {
  it('visit the battlship page', () => {
    cy.visit('https://awesome-mccarthy-08cd24.netlify.app/')

    cy.contains('Confirm').click()

    cy.contains('Enter a username to start the game').should('be.visible')
  })
  it('enter a username', () => {
    cy.visit('https://awesome-mccarthy-08cd24.netlify.app/')

    cy.get('input').type('test')
    cy.contains('Confirm').click()

    cy.contains('Rotate').should('be.visible')
  })

  it('place a ship', () => {
    cy.visit('https://awesome-mccarthy-08cd24.netlify.app/')

    cy.get('input').type('test')
    cy.contains('Confirm').click()
    cy.get('[class="case 11"]').click()

    cy.get('[class="case 11"]').should('have.css', 'background-color', 'rgba(5, 255, 0, 0.59)')
    cy.get('[class="case 21"]').should('have.css', 'background-color', 'rgba(5, 255, 0, 0.59)')
    cy.get('[class="case 31"]').should('have.css', 'background-color', 'rgba(5, 255, 0, 0.59)')
    cy.get('[class="case 41"]').should('have.css', 'background-color', 'rgba(5, 255, 0, 0.59)')

  })
})
