describe('authorization', function() {
  it('sign up', function() {
    cy.visit('http://localhost:8080/')
    cy.get('a').contains('sign up').click()
    cy.get('input[name="email"]').type('jane23@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('input[name="confirmPassword"]').type('123456')
    cy.get('input[name="username"]').type('someusername')
    cy.get('input[name="checked"]').click()
    cy.get('button[type="submit"]').contains('Submit').click()
  });
  
  it('sign in', function() {
    cy.visit('http://localhost:8080/')
    cy.get('a').contains('login').click()
    cy.get('input[name="email"]').type('jane@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').contains('Log in').click()
  });
});