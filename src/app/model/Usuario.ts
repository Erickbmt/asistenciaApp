import { DatabaseService } from "../services/database.service";
import { SqliteService } from "../services/sqlite.service";
import { showAlertDUOC } from "./Message";

export class Usuario {
  // Definir variables
  public correo = '';
  public password = '';
  public nombre = '';
  public pregunta = '';
  public respuesta = '';
  public sesionActiva = '';

  constructor (){
  }
// SET USUARIO PARA USARLO CON LAS AUTENTIFICACIONES Y EL STORAGE
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
      this.pregunta = '';
      this.respuesta = '';
    
    } else {
      this.password = password;
      this.pregunta = preguntaSecreta;
      this.respuesta = respuestaSecreta;
    }
}

// Validar solo correo
  public validarCorreo(correo: string): string {
    if (this.correo.trim() === '') return 'Las credenciales no son validas';
    return '';
  }

// Validar contraseña

public validarPassword(correo: string): string {
  if (this.password.trim() === '') return 'Las credenciales no son validas';

  return '';
}

//---------------------- Validaciones ------------------------------
async validateUser(correo: string, password: string, db: DatabaseService): Promise<boolean> {
  return new Promise(async (resolve) => {
    let msg = this.validarCorreo(correo);
    if (msg) {
      await showAlertDUOC(msg);
      return Promise.resolve(false);
    }
    msg = this.validarPassword(password);
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
    this.pregunta = usu.pregunta;
    this.respuesta = usu.respuesta;
    return Promise.resolve(usu);
  });
}
}

