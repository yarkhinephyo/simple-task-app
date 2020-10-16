// https://docs.cypress.io/api/introduction/api.html


const taskStr = "This is a sample task";
const waitTime = 1000;

describe('Task Page (Computer)', () => {

  it('Shows header', () => {
    cy.visit('/');
    cy.get('h1.display-3')
      .contains('Tasks App')
    cy.wait(2000)
  });

  it('Can click Add button', () => {
    cy.get('svg.bi-folder-plus').parent().click()
    cy.contains('button.btn', 'Done')
      .should('be.visible')
      .parents('div.card-body')
      .within(() => {
        cy.get('input.form-control')
          .should('have.attr', 'placeholder', 'I have to...')
      })
  });

  it('Can create task', () => {
    cy.get('input.form-control').type(taskStr + "{enter}")
    cy.contains(taskStr)
      .parents('div.card-body')
      .within(() => {
        cy.get('svg.bi-check2')
      })
    cy.wait(waitTime)
  });

  it('Can update task', () => {
    cy.contains(taskStr)
      .parents('div.card-body')
      .within(() => {
        cy.get('svg.bi-pencil-fill').click()
        cy.get('input.form-control').type("!{enter}")
      })
    cy.contains(taskStr + "!")
    cy.wait(waitTime)
  });

  it('Can delete task', () => {
    cy.contains(taskStr + "!")
      .parents('div.card-body')
      .within(() => {
        cy.get('svg.bi-trash-fill').click()
      })
    cy.contains(taskStr + "!").should('not.exist')
    cy.wait(waitTime)
  });

});

describe('Task Page (Mobile)', () => {

  beforeEach(() => {
    cy.viewport(550, 500)
  });

  it('Shows header', () => {
    cy.get('h1.display-3')
      .contains('Tasks App')
  });

  it('Can click Add button', () => {
    cy.get('svg.bi-folder-plus').parent().click()
    cy.contains('button.btn', 'Done')
      .should('be.visible')
      .parents('div.card-body')
      .within(() => {
        cy.get('input.form-control')
          .should('have.attr', 'placeholder', 'I have to...')
      })
  });

  it('Can create task', () => {
    cy.get('input.form-control').type(taskStr + "{enter}")
    cy.contains(taskStr)
      .parents('div.card-body')
      .within(() => {
        cy.get('svg.bi-three-dots')
      })
    cy.wait(waitTime)
  });

  it('Can update task', () => {
    cy.contains(taskStr)
      .parents('div.card-body')
      .within(() => {
        cy.get('svg.bi-three-dots').click()
        cy.contains('a.dropdown-item', 'Edit').click()
        cy.get('input.form-control').type("!{enter}")
      })
    cy.contains(taskStr + "!")
    cy.wait(waitTime)
  });

  it('Can delete task', () => {
    cy.contains(taskStr + "!")
      .parents('div.card-body')
      .within(() => {
        cy.get('svg.bi-three-dots').click()
        cy.contains('a.dropdown-item', 'Delete').click()
      })
    cy.contains(taskStr + "!").should('not.exist')
    cy.wait(waitTime)
  });

})