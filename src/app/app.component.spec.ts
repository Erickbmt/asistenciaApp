import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';

// Usuario
import { Usuario } from './model/Usuario'

describe('AppComponent', () => {

  describe('Probar el comienzo de la aplicación', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    });
  
    // it('Se debería crear la aplicación', () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   const app = fixture.componentInstance;
    //   expect(app).toBeTruthy();
    // });
    // No funciona porque no se ejecuta la base de datos
  
  });
  
  describe('Probar clase de usuario', () => {
  
    describe ('Probar que la contraseña sea correcta', () => {
        const usuario = new Usuario();
  
        it ('Probar que la contraseña no sea vacía', () => {
          usuario.password = '';
          expect(usuario.validatePassword(usuario.password)).toContain('Para entrar al sistema debe ingresar la contraseña.');
        });

        it ('Probar que la contraseña no sea mayor a 4 digitos', () =>{
          usuario.password = '12345';
          expect(usuario.validatePassword(usuario.password)).toContain('La contraseña debe ser menor a 4 digitos');
        });

        it ('Probar que la contraseña sea numerica', () =>{
          usuario.password = 'abcd';
          expect(usuario.validatePassword(usuario.password)).toContain('La contraseña debe ser numérica.');
        });
  
      });

      describe ('Probar que el correo sea correcto', () => {
        const usuario = new Usuario();
  
        it ('Probar que el correo no este vacio', () => {
          usuario.correo = '';
          expect(usuario.validateEmail(usuario.correo)).toContain('Para ingresar al sistema debe ingresar el correo del usuario.');
        });
  
      });
  
  });

});
