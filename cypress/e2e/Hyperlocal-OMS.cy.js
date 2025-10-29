describe('Hyperlocal OMS', () => {
  it('Login e acesso à tela de pedidos', () => {
    cy.visit('https://login-uat.go2go.com.br');

    cy.get('#email').type('suporte.oms@hyperlocal.com.br');
    cy.get('#password').type('Hyper@123', { log: false });
    cy.get('[data-testid="button-button"]').click();

    // Aguarda redirecionamento automático
    cy.wait(10000); // tempo para Cognito redirecionar

    // Visita a tela de pedidos ignorando o evento load
    cy.visit('https://sistema-testing.go2go.com.br/orders/view', {
      timeout: 60000,
      pageLoadTimeout: 0
    });

    // Aguarda elemento visível para confirmar que a página está pronta
    cy.get('[data-testid="menu-orders"]', { timeout: 20000 }).should('be.visible');
  });
});