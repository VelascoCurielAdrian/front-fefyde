export const SESIONES = 'sesiones';
export const PERMISOS = 'permisos';
export const TIPO_ACTIVIDADES = 'tipoActividades';
export const ACTIVIDADES = 'actividades';
export const ALUMNOS = 'alumnos';
export const GRUPOS = 'grupos';
export const CICLO_ESCOLARES = 'cicloEscolares';
export const CARRERAS = 'carreras';

const endpoints = {
  base: {
    url: (uri, id = '') => `/${uri}/${id}`,
    listado: (uri, params) => `/${uri}/listado${params}`,
  },
  iniciarSesion: () => `/${SESIONES}/iniciar`,
  permisos: () => `${PERMISOS}/perfil`,
  tipoActividades: {
    base: (id = '') => `/${TIPO_ACTIVIDADES}/${id}`,
  },
  actividades: {
    base: (id = '') => `/${ACTIVIDADES}/${id}`,
  },
  alumnos: {
    base: (id = '') => `/${ALUMNOS}/${id}`,
    multiples: () => `/${ALUMNOS}/multiple`,
    cicloEscolar: () => `/${ALUMNOS}/cicloEscolar`,
    grupos: () => `${ALUMNOS}/grupos`,
  },
  grupos: {
    base: (id = '') => `/${GRUPOS}/${id}`,
  },
  cicloEscolar: {
    base: (id = '') => `/${CICLO_ESCOLARES}/${id}`,
  },
  carrera: {
    base: (id = '') => `/${CARRERAS}/${id}`,
  },
};

export default endpoints;
