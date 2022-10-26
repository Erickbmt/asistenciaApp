export class Usuario {
  // Definir variables
  public correo = '';
  public password = '';
  public nombre = '';
  public pregunta = '';
  public respuesta = '';

  constructor (correo:string, password:string, nombre:string, pregunta:string, respuesta: string){
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
  }
// Lista y funcion para la lista con usuarios
  public listaValidaUsuarios(): Usuario[] {
    const lista = []

    lista.push(new Usuario('atorres@duocuc.cl', '1234', 'Ana Torres Leiva'
      , '¿Cuál es tu animal favorito?', 'gato'));
    lista.push(new Usuario('jperez@duocuc.cl', '5678', 'Juan Pérez González'
      , '¿Cuál es tu postre favorito?', 'panqueques'));
    lista.push(new Usuario('cmujica@duocuc.cl', '0987', 'Carla Mujica Sáez'
      , '¿Cuál es tu vehículo favorito?', 'moto'));
    return lista;

  }

// Para validar las credenciales de la contraseña y el correo
  public buscarUsuarioValido(correo: string, password: string): Usuario {
    return this.listaValidaUsuarios().find(
      user => user.correo === correo && user.password === password);
  }

// Validar solo correo
public buscarCorreoValido(correo: string): Usuario {
  return this.listaValidaUsuarios().find(
    user => user.correo === correo);
  }

// Validar solo respuesta a la pregunta
  public buscarRespuestaValida(respuesta:String): Usuario {
    return this.listaValidaUsuarios().find(
      user => user.respuesta === respuesta);
  }

//---------------------- Validaciones ------------------------------
  public validarcorreo(): string {
    if (this.correo.trim() === '') {
      return 'Para ingresar al sistema debe digitar su Correo Electrónico.';
    }
    if (this.correo.length < 10 || this.correo.length > 25) {
      return 'El nombre de usuario debe tener entre 10 y 25 caracteres.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }
}

