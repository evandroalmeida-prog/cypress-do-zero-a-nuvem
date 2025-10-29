describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
 
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.get('#firstName').type('Evandro')
     cy.get('#lastName').type('Almeida')
    cy.get('#email').type('evandro.almeida@hyperlocal.com.br')
    cy.get('#open-text-area').type('Gostaria de uma ajuda humanitária para testar sistemas em Cypress',
          { delay: 0 })
    cy.get('.button').click()
    //cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Evandro')
    cy.get('#lastName').type('Almeida')
    cy.get('#email').type('evandro.almeida@hyperlocal,com.br')
    cy.get('#open-text-area').type('Gostaria de uma ajuda humanitária para testar sistemas em Cypress',
          { delay: 0 })
    //cy.get('.button').click()
    cy.pause
    cy.contains('button','Enviar').click()
  //  cy.get('button[type="submit"]').click()
 
    cy.get('.error').should('be.visible')
  })

   it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {

    cy.get('#phone')
       .type('abcde')
       .should('have.value', '')

   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Evandro')
    cy.get('#lastName').type('Almeida')
    cy.get('#email').type('evandro.almeida@hyperlocal,com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
  
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
   }) 

   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
       .type('Evandro')
       .should('have.value', 'Evandro')
       .clear()
       .should('have.value', '')
    cy.get('#lastName')
       .type('Almeida')
       .should('have.value', 'Almeida')
       .clear()
       .should('have.value', '')       
    cy.get('#email')
       .type('evandro.almeida@hyperlocal,com.br')
       .should('have.value', 'evandro.almeida@hyperlocal,com.br')
       .clear()
       .should('have.value', '')       
    cy.get('#phone')
       .type('123456789')
       .should('have.value', '123456789')
       .clear()
       .should('have.value', '')            

   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

   })

   it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Evandro',
      lastName: 'Almeida',
      email: 'evandro.almeida@hyperlocal.com.br',
      text: 'Gostaria de uma ajuda humanitária para testar sistemas em Cypress'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')

  
   })

  it('Seleciona um produto (youtube) por seu texo', () => {
     cy.get('#product')
     .select('YouTube')
     .should('have.value','youtube')  
    
   })

     it('Seleciona um produto (Mentoria) por seu valor', () => {
     cy.get('#product')
     .select('mentoria')
     .should('have.value','mentoria')  
    
   })

     it('Seleciona um produto (Blog) por seu indice', () => {
     cy.get('#product')
     .select(1)
     .should('have.value','blog')  
    
   })

     it('Marca o tipo de atendimento (Feedback)', () => {
     cy.get('input[type="radio"][value="feedback"]')
     .check()
     .should('be.checked')
   })

   it('Marca cada tipo de atendimento', () => {
     cy.get('input[type="radio"]')
       .each(typeOfService => {
         cy.wrap(typeOfService)
          .check()
          .should('be.checked')
     })
   })

   it('Marca ambos checkboxes, depoois desmarca o último', () => {
     cy.get('input[type="checkbox"]')
     .check()
     .should('be.checked')
     .last()
     .uncheck()
     .should('not.be.checked')
 
   })
   
  
   it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
      //console.log(input)    
      //console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json')
   })
  
   })
   
   it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
      //console.log(input)    
      //console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json')
   })
   })


  it('Seleciona um arquivo utilizando uma fixture pela qual foi dada um alias', () => {
    cy.fixture('example.json').as('samplefile')
    cy.get('#file-upload')
      .selectFile('@samplefile')
      .should(input => {
      //console.log(input)    
      //console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json')
   })
   })

   it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a','Política de Privacidade') 
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr' , 'target', '_blank')
   })


    it('Acessa a página de politica de privacidade removendo o target e então clicando no link ', () => {
      cy.contains('a','Política de Privacidade') 
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

   })

   it('Teste a página de politica de privacidade de forma independente', () => {
      cy.contains('a','Política de Privacidade') 
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

   })



})