import { DatabaseService } from "../services/database.service";
import { SQLiteService } from "../services/sqlite.service";
import { showAlertDUOC } from "./Message";


export class Usuario {

    public correo = '';
    public password = '';
    public nombre = '';
    public preguntaSecreta = '';
    public respuestaSecreta = '';
    public sesionActiva = '';

    constructor() { }

    setUser(correo: string,
        password: string,
        nombre: string,
        preguntaSecreta: string,
        respuestaSecreta: string,
        sesionActiva: string,
        hideSecrets: boolean)
    {
        this.correo = correo;
        this.nombre = nombre;
        this.sesionActiva = sesionActiva;
        if (hideSecrets) {
          this.password = '';
          this.preguntaSecreta = '';
          this.respuestaSecreta = '';
        
        } else {
          this.password = password;
          this.preguntaSecreta = preguntaSecreta;
          this.respuestaSecreta = respuestaSecreta;
        }
    }

    validateEmail(correo: string): string {
      if (correo.trim() === '') return 'Para ingresar al sistema debe ingresar el correo del usuario.';
      if(correo.length !== 17) return 'El correo debe ser menor a 17 letras';
      return '';
    }
  
    validatePassword(password: string): string {
      if (password.trim() === '') return 'Para entrar al sistema debe ingresar la contraseña.';

      for(let i = 0; i < this.password.length; i++) {
        if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
          return 'La contraseña debe ser numérica.';
        }
      }

      if (password.length !== 4) return 'La contraseña debe ser menor a 4 digitos';

      return '';
    }

    async validateUser(correo: string, password: string, db: DatabaseService): Promise<boolean> {
      return new Promise(async (resolve) => {
        let msg = this.validateEmail(correo);
        if (msg) {
          await showAlertDUOC(msg);
          return Promise.resolve(false);
        }
        msg = this.validatePassword(password);
        if (msg) {
          await showAlertDUOC(msg);
          return Promise.resolve(false);
        }
        const usu = await db.readUser(correo, password, true);
        if (usu === null) {
          await showAlertDUOC('El correo o la contraseña no son correctos');
          return Promise.resolve(null);
        }
        this.correo = usu.correo;
        this.nombre = usu.nombre;
        this.sesionActiva = usu.sesionActiva;
        this.password = usu.password;
        this.preguntaSecreta = usu.preguntaSecreta;
        this.respuestaSecreta = usu.respuestaSecreta;
        return Promise.resolve(usu);
      });
    }

    validateName(nombre: string): string {
      if (nombre.trim() === '') return 'Debe ingresar su nombre.';
      return '';
    }

    validateSecretQuestion(question: string): string {
      if (question.trim() === '') return 'Debe ingresar su pregunta secreta.';
      return '';
    }

    validateSecretAnswer(answer: string): string {
      if (answer.trim() === '') return 'Debe ingresar su respuesta secreta.';
      return '';
    }

    validateUserFields(correo: string, password: string, name: string
      , secretQuestion: string, secretAnswer: string): string {
    return this.validateEmail(correo) 
      || this.validatePassword(password)
      || this.validateName(name)
      || this.validateSecretQuestion(secretQuestion)
      || this.validateSecretAnswer(secretAnswer)
  }
  }
  