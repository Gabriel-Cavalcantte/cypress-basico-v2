/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    const tres_segundo = 3000
    beforeEach(function () {
        cy.visit(`./src/index.html`)

    })

    it('verifica o título da aplicação', function() {
        cy.title().should(`be.equal`,`Central de Atendimento ao Cliente TAT`)

    })

    it(`preenche os campos obrigatórios e envia o formulário`, function (){
        cy.clock()
        cy.get('#firstName').type(`Gabriel`).click()
        cy.get('#lastName').type(`Almeida`).click()
        cy.get('#email').type(`emailtest@gmail.com`).click()
        cy.get('#open-text-area').type(`emailtest@gmail.com`, {delay : 0, log : true}).click()
        cy.contains('button', `Enviar`).click()
        cy.get(`.success > strong`).should(`be.visible`)
        cy.tick(tres_segundo)
        cy.get(`.success > strong`).should(`not.be.visible`)
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function (){
        cy.clock()
        cy.get('#firstName').type(`Gabriel`).click()
        cy.get('#lastName').type(`Almeida`).click()
        cy.get('#email').type(`emailtestgmail.com`).click()
        cy.get('#open-text-area').type(`emailtest@gmail.com`, {delay : 0, log : true}).click()
        cy.contains('button', `Enviar`).click()
        cy.get(`.error > strong`).should(`be.visible`)
        cy.tick(tres_segundo)
        cy.get(`.error > strong`).should(`not.be.visible`)
    })

    it('verificar que o campo telefone continua vazio após digitar um valor não-numérico ', function() {
      cy.get(`#phone`).type(`testecamponumero`).should(`have.value`, ``)

    })

    it(`exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`, function(){
        cy.get('#firstName').type(`Gabriel`).click()
        cy.get('#lastName').type(`Almeida`).click()
        cy.get('#email').type(`emailtest@gmail.com`).click()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(`emailtest@gmail.com`, {delay : 0, log : true}).click()
        cy.contains('button', `Enviar`).click()

    })

    it(`preenche e limpa os campos nome, sobrenome, email e telefone`, function(){
        cy.get('#firstName').type(`Gabriel`).clear().should(`have.visible`,``)
        cy.get('#lastName').type(`Almeida`).clear().should(`have.visible`,``)
        cy.get('#email').type(`emailtest@gmail.com`).clear().should(`have.visible`,``)
        cy.get('#phone-checkbox').check()
        cy.get(`#phone`).type(`121212`).clear().should(`have.visible`,``)
    })

    it(`exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios`, function(){
        cy.clock()
        cy.get('#firstName').type(`Gabriel`).clear().should(`have.visible`,``)
        cy.get('#lastName').type(`Almeida`).clear().should(`have.visible`,``)
        cy.get('#email').type(`emailtest@gmail.com`).clear().should(`have.visible`,``)
        cy.get('#phone-checkbox').check()
        cy.get(`#phone`).type(`121212`).clear().should(`have.visible`,``)
        cy.contains('button', `Enviar`).click()
        cy.get(`.error > strong`).should(`be.visible`)
        cy.tick(tres_segundo)
        cy.get(`.error > strong`).should(`not.be.visible`)
    })

    // it(`envia o formuário com sucesso usando um comando customizado`, function (){
    //     cy.fillMandatoryFieldsAndSubmit()
    //     cy.get(`.success > strong`).should(`be.visible`)
    //
    // })
    it(`seleciona um produto (YouTube) por seu texto`, function (){
        cy.get(`#product`).select(`youtube`).should(`have.value`,`youtube`)
    })

    it(`seleciona um produto (Mentoria) por seu valor (value)`, function(){
        cy.get(`#product`).select(`mentoria`).should(`have.value`,`mentoria`)

    })

    it(`seleciona um produto (Blog) por seu índice`, function (){
        cy.get(`#product`).select([1]).should(`have.value`,`blog`)
    })

    it(`marca o tipo de atendimento "Feedback"`, function (){
        cy.get('[type="radio"]').check(`feedback`)

    })

    it(`marca cada tipo de atendimento`, function (){

        cy.get('[type="radio"][value="ajuda"]').check().should(`have.value`, `ajuda`)
        cy.get('[type="radio"][value="elogio"]').check().should(`have.value`, `elogio`)
        cy.get('[type="radio"][value="feedback"]').check().should(`have.value`, `feedback`)

    })

    it(`Exemplo de each e wrap`, function (){
        cy.get(`[type="radio"]`).should(`have.length`, 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should(`be.checked`)
            })
    })

    it(`Marcando (e desmarcando) inputs do tipo checkbox`, function () {
        cy.get(`input[type="checkbox"]`).check().should(`be.checked`).last().uncheck().should(`not.be.checked`)

        })

    it(`seleciona um arquivo da pasta fixtures`, function(){
        cy.fixture(`example.json`).as(`sample.json`)
        cy.get(`input[type="file"]`).should(`not.have.value`).selectFile(`cypress/fixtures/example.json`, {action: `drag-drop`})
            .should(function ($input){
                expect($input[0].files[0].name).to.equal(`example.json`)
            })
    })

    it(`seleciona um arquivo simulando um drag-and-drop`, function(){
        cy.readFile(`cypress/fixtures/example.json`)
        cy.get(`input[type="file"]`).selectFile(`cypress/fixtures/example.json`, {action: `drag-drop`})
        cy.get(`input[type="file"]`).should(`not.have.value`).selectFile(`cypress/fixtures/example.json`, {action: `drag-drop`})
            .should(function ($input){
            expect($input[0].files[0].name).to.equal(`example.json`)
            })
    })

    it(`seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`, function(){
        cy.fixture(`example.json`).as(`sampleFile`)
        cy.get(`input[type="file"]`).selectFile(`@sampleFile`)

    })

    it(`verifica que a política de privacidade abre em outra aba sem a necessidade de um clique`, function(){
        cy.get(`#privacy a`).should(`have.attr`,`target`, `_blank`)
    })

    it(`acessa a página da política de privacidade removendo o target e então clicando no link`, function(){
        cy.get(`#privacy a`).invoke(`removeAttr`, `target`).click()
        cy.contains(`Talking About Testing`).should(`be.visible`)
    })

    it(`testa a página da política de privacidade de forma independente`, function (){
        cy.visit(`./src/privacy.html`)
        cy.contains(`Talking About Testing`).should(`be.visible`)
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get(`.success`).invoke(`show`).should(`be.visible`).and(`contain`,`Mensagem enviada com sucesso.`)
            .invoke(`hide`).should(`not.be.visible`)
        cy.get(`.error`).invoke(`show`).should(`be.visible`).and(`contain`,`Valide os campos obrigatórios!`)
            .invoke(`hide`).should(`not.be.visible`)
    })

    it(`preenche a area de texto usando o comando invoke`, function (){
        const longText = Cypress._.repeat(`0123456789`, 20)
        cy.get(`#open-text-area`).invoke(`val`, longText).should(`have.value`, longText)
    })

    it(`faz uma requisição HTTP`, function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function (response){
            const {status , statusText, body} = response
            expect(status).to.equal(200);
            expect(statusText).to.equal('OK');
            expect(body).to.include('CAC TAT');

        })
    })

    it(`Encontrando o gato`, function(){
        cy.get('#cat').invoke('show').should('be.visible')
    })
})
