const URL = '192.168.0.25:8080';

context('Memotest', () => {
  before(() => {
    cy.visit(URL);
  });

  describe('juega al memotest', () => {
    const NUMERO_CUADROS = 12;

    it('se asegura que haya un tablero con cuadros', () => {
      cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
    });
  });
});
