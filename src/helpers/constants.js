export const IS_REQUERED = 'Numero invalido';
export const NUMBER_INVALID = 'Numero invalido';
export const ZIP_CODE = 'Codigo postal invalido';
export const MESSAGE_REQUIRED = 'Este campo es requerido';
export const EMAIL_INVALID = 'Correo electronico invalido';
export const TELEPHONE_INVALID = 'Numero télefono invalido';
export const NUMBER_ADDRESSLINE_MIN = 'debe tener como minimo 4 caracteres';
export const NUMBER_ADDRESSLINE_MAX = 'debe tener como maximo 4 caracteres';
export const TELEPHONE_VALIDATE = 'El télefono debe tener como minimo 10 dígitos';

export const TipoEstatus = [
  { id: true, nombre: 'Habilitado' },
  { id: false, nombre: 'Inhabilitado' },
];

export const Generos = [
  { id: 1, nombre: 'Masculino', clave: 'M' },
  { id: 2, nombre: 'Femenino', clave: 'F' },
];

export const Semestres = [
  { id: 1, nombre: 'Semestre 1' },
  { id: 2, nombre: 'Semestre 2' },
  { id: 3, nombre: 'Semestre 3' },
  { id: 4, nombre: 'Semestre 4' },
  { id: 5, nombre: 'Semestre 5' },
  { id: 6, nombre: 'Semestre 6' },
  { id: 7, nombre: 'Semestre 7' },
  { id: 8, nombre: 'Semestre 8' },
  { id: 9, nombre: 'Semestre 9' },
  { id: 10, nombre: 'Semestre 10' },
];

export const TiposDuracion = [
  { id: 1, nombre: ' Horas' },
  { id: 2, nombre: ' Años' },
  { id: 3, nombre: ' Mes' },
  { id: 4, nombre: ' Semanas' },
  { id: 5, nombre: ' Días' },
];

export const tabs = [
  { id: 0, label: 'Cuenta' },
  { id: 1, label: 'Nombre' },
  { id: 2, label: 'Apellido Paterno' },
  { id: 3, label: 'Apellido Materno' },
  { id: 4, label: 'Correo' },
  { id: 5, label: 'Télefono Fijo' },
  { id: 6, label: 'Télefono Celular' },
  { id: 7, label: 'Fecha Nacimiento' },
  { id: 8, label: 'Ciclo' },
  { id: 9, label: 'Semestre' },
  { id: 10, label: 'Grupo' },
  { id: 11, label: 'Edad' },
  { id: 12, label: 'Género' },
];

export const tabData = [
  {
    index: 0,
    content:
      'Cuenta institucional, que hace referencia al número único o clave que identifica al alumno. Formato: 000000-0.',
  },
  {
    index: 1,
    content:
      'Nombre del alumno, no debe contener caracteres especiales y no debe exceder de 50 caracteres en total.',
  },
  {
    index: 2,
    content:
      'Apellido paterno del alumno, no debe contener caracteres especiales y no debe exceder de 50 caracteres en total.',
  },
  {
    index: 3,
    content:
      'Apellido materno del alumno, no debe contener caracteres especiales y no debe exceder de 50 caracteres en total.',
  },
  {
    index: 4,
    content:
      'El correo del alumno debe ser institucional y cumplir con el dominio de la Facultad de Informática (@info.uas.edu.mx).',
  },
  {
    index: 5,
    content:
      'El teléfono fijo debe componerse de 10 dígitos del 0 al 9 y no debe incluir caracteres especiales, ejemplo: 6677443322.',
  },
  {
    index: 6,
    content:
      'El teléfono celular debe componerse de 10 dígitos del 0 al 9 y no debe incluir caracteres especiales, ejemplo: 6677443322.',
  },
  {
    index: 7,
    content:
      'Debe complir con el siguiente formato: YYYY-MM-DD, donde YYYY indica el año, MM indica el mes y DD indica el día (2023-01-01).',
  },
  {
    index: 8,
    content:
      'Ciclo escolar del alumno, que indica la generación en que el alumno esta cursando, el formato es 00-00, donde los dos primeros digitos indican el año de inicio y los dos últimos el año de terminación.',
  },
  {
    index: 9,
    content:
      'Semestre actual del alumno, no debe ser menor a 1 ni mayor a 10.',
  },
  {
    index: 10,
    content: 'Grupo del alumno, no debe ser menor a 0 ni mayor de 5.',
  },
  {
    index: 11,
    content: 'La edad del alumno debe expresarse únicamente con números.',
  },
  {
    index: 12,
    content:
      'Ingresar "M" para indicar el género masculino o "F" para indicar el género femenino del alumno.',
  },
];

export const sizeIcon = 22;
