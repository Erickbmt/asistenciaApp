
// ----------- por defecto ------------------
// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

// Debido a que no se puede acceder a home sin base de datos solo usaremos cosas esteticas.
describe('Verificar mi aplicacion', () =>{
  it('Verficar login con credenciales incorrectas', () => {

    cy.visit('http://localhost:8100').then(() => {
      cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
      cy.get('ion-card-title').should('contain.text', 'Bienvenido');
      cy.wait(3000);
      cy.get('#correo').invoke('val', 'dav.fernandez@duocuc.cl');
      cy.get('#password').invoke('val', 'Nakito');
      cy.wait(3000);
      cy.contains('Ingresa a tu cuenta').click();
    });
  });

  it('Verficar login con credenciales correctas', () => {
    cy.wait(2000);
    cy.visit('http://localhost:8100').then(() => {
      cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
      cy.get('ion-card-title').should('contain.text', 'Bienvenido');
      cy.wait(3000);
      cy.get('#correo').invoke('val', 'jperez@duocuc.cl');
      cy.get('#password').invoke('val', '5678');
      cy.wait(3000);
      cy.contains('Ingresa a tu cuenta').click();
    });
  });
  
  it('Verificar olvidar contraseña correcto', () => {
    cy.wait(2000);
    cy.visit('http://localhost:8100').then(()=> {
      cy.wait(3000);
      cy.contains('¿Olvidaste tu contraseña?').click();
      cy.intercept('/correo').as('route').then(() =>{
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.get('ion-label').should('contain.text', 'Recuperar Contraseña');
        cy.wait(3000);
        cy.get('#email').invoke('val', 'jperez@duocuc.cl');
        cy.wait(3000);
        cy.contains('Recuperar contraseña').click();
        cy.wait(5000);
        cy.contains('Volver al Inicio').click();
      })
    })
  });

  it('Verificar olvidar contraseña incorrecto', () => {
    cy.wait(2000);
    cy.visit('http://localhost:8100').then(()=> {
      cy.wait(3000);
      cy.contains('¿Olvidaste tu contraseña?').click();
      cy.intercept('/correo').as('route').then(() =>{
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.get('ion-label').should('contain.text', 'Recuperar Contraseña');
        cy.wait(3000);
        cy.get('#email').invoke('val', 'mevoy.alaplaya@duocuc.cl');
        cy.wait(3000);
        cy.contains('Recuperar contraseña').click();
        cy.wait(3000);
        cy.contains('Volver al Inicio').click();
      })
    })
  });
});