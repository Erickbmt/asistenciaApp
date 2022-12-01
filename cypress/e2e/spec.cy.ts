describe('Verificar mi aplicacion', () =>{
  it('Verficar login con credenciales incorrectas', () => {

    cy.visit('http://localhost:8100').then(() => {
      cy.wait(5000);
      cy.get('#correo').invoke('val', 'dav.fernandez@duocuc.cl');
      cy.get('#password').invoke('val', 'Nakito');
      cy.contains('Ingresa a tu cuenta').click();
      cy.intercept('/home').as('route').then(() =>{
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        // cy.get('#saludo').should('contain.text', '¡Bienvenido Nakito Tempest!')
      });
    });
  });

  it('Verficar login con credenciales correctas', () => {
    cy.wait(5000);
    cy.visit('http://localhost:8100').then(() => {
      cy.wait(3000);
      cy.get('#correo').invoke('val', 'jperez@duocuc.cl');
      cy.wait(3000);
      cy.get('#password').invoke('val', '5678');
      cy.wait(3000);
      cy.contains('Ingresa a tu cuenta').click();
      cy.intercept('/home').as('route').then(() =>{
        cy.wait(3000);
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        // cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!')
        cy.wait(3000);
        cy.contains('Salir').click();
      });
    });
  
  it('Verificar olvidar contraseña correcto', () => {
    cy.wait(5000);
    cy.visit('http://localhost:8100').then(()=> {
      cy.wait(3000);
      cy.contains('¿Olvidaste tu contraseña?').click();
      cy.intercept('/correo').as('route').then(() =>{
        cy.wait(3000);
        cy.get('#correo').invoke('val', 'jperez@duocuc.cl');
        cy.wait(3000);
        cy.contains('Recuperar contraseña').click();
        cy.intercept('/pregunta').as('route').then(() => {
          cy.wait(3000);
          cy.get('#respuesta').invoke('val', 'panqueques');
          cy.wait(3000);
          cy.contains('Recuperar contraseña').click();
          cy.intercept('/correcto').as('rorute').then(() => {
            cy.wait(5000);
            cy.contains('Iniciar sesion').click();
          })

        })
      })
    })
  });

  it('Verificar olvidar contraseña incorrecto', () => {
    cy.wait(5000);
    cy.visit('http://localhost:8100').then(()=> {
      cy.wait(3000);
      cy.contains('¿Olvidaste tu contraseña?').click();
      cy.intercept('/correo').as('route').then(() =>{
        cy.wait(3000);
        cy.get('#correo').invoke('val', 'jperez@duocuc.cl');
        cy.wait(3000);
        cy.contains('Recuperar contraseña').click();
        cy.intercept('/pregunta').as('route').then(() => {
          cy.wait(3000);
          cy.get('#respuesta').invoke('val', 'gato');
          cy.wait(3000);
          cy.contains('Recuperar contraseña').click();
          cy.intercept('/incorrecto').as('rorute').then(() => {
            cy.wait(5000);
            cy.contains('Iniciar sesion').click();
          })

        })
      })
    })
  });
      
  
      
  });
});