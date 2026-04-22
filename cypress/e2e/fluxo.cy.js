describe('Teste End-to-End - Hub Escola Pro', () => {
  it('Fluxo Completo: Registrar, Logar, Criar, Editar e Deletar', () => {
    cy.visit('http://localhost:3000');
    
    // 1. Registro de Usuário
    cy.contains('Registre-se').click();
    cy.get('#login').type('diretor_teste');
    cy.get('#senha').type('senhaSegura');
    cy.get('#btnAuth').click(); 

    // O sistema emite um alert ao criar conta, vamos ignorá-lo para o teste seguir
    cy.on('window:alert', () => true);

    // 2. Login
    cy.get('#login').clear().type('diretor_teste');
    cy.get('#senha').clear().type('senhaSegura');
    cy.get('#btnAuth').click();

    // Valida se entrou no painel
    cy.get('#crudSection').should('be.visible');

    // 3. Criar Escola
    cy.get('#nomeEscola').type('Escola Primária E2E');
    cy.get('#localEscola').type('Plano Piloto');
    cy.get('#btnSalvar').click();
    cy.get('#listaEscolas').should('contain', 'Escola Primária E2E');

    // 4. Editar Escola
    cy.contains('Escola Primária E2E').parent().parent().find('.btn-edit').click();
    cy.get('#nomeEscola').clear().type('Escola Secundária E2E');
    cy.get('#btnSalvar').click();
    cy.get('#listaEscolas').should('contain', 'Escola Secundária E2E');

    // 5. Excluir Escola
    // O sistema pede confirmação, dizemos 'sim' (true)
    cy.on('window:confirm', () => true);
    cy.contains('Escola Secundária E2E').parent().parent().find('.btn-danger').contains('Excluir').click();
    cy.get('#listaEscolas').should('not.contain', 'Escola Secundária E2E');
  });
});