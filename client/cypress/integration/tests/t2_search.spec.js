describe('search', function() {
    it('search', function() {
      cy.get('input[name="searchField"]').type('venecia')
      cy.get('button[type="submit"]').contains('search').click()
    });
  });