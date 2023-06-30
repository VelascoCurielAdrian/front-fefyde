import * as yup from 'yup';
import { isNaN } from 'lodash';

import { EMAIL_INVALID, MESSAGE_REQUIRED } from '../helpers/constants';
import axios from '../configuracion/axios';
import endpoints from '../configuracion/endpoints';

const CREATE = (body) => axios.post(endpoints.alumnos.base(), body);

const CREATE_MULTIPLES = (body) => axios.post(endpoints.alumnos.multiples(), body);

const DELETE = (id) => axios.delete(endpoints.alumnos.base(id));

const UPDATE = (body) => axios.put(endpoints.alumnos.base(), body);

const GET = (filtros) => axios.get(endpoints.alumnos.base(), {
  params: {
    ...filtros,
  },
});

const GET_BYID = (id) => axios.get(endpoints.alumnos.base(id));

export const GET_CICLO = () => axios.get(endpoints.cicloEscolar.base());

export const GET_GRUPO = () => axios.get(endpoints.grupos.base());

export const GET_CARRERA = () => axios.get(endpoints.carrera.base());

export const Validacion = yup.object({
  cuenta: yup.string().required(MESSAGE_REQUIRED),
  nombre: yup.string().required(MESSAGE_REQUIRED),
  apellidoPaterno: yup.string().required(MESSAGE_REQUIRED),
  apellidoMaterno: yup.string().required(MESSAGE_REQUIRED),
  correo: yup.string().email(EMAIL_INVALID).required(MESSAGE_REQUIRED),
  fechaNacimiento: yup.string().required(MESSAGE_REQUIRED),
  telefonoFijo: yup
    .number()
    .required(MESSAGE_REQUIRED),
  telefonoCelular: yup
    .number()
    .required(MESSAGE_REQUIRED),
  cicloEscolarID: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  carreraID: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  semestre: yup.string().required(MESSAGE_REQUIRED),
  grupoID: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  edad: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  genero: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
});

export const AlumnosActions = {
  CREATE_MULTIPLES,
  GET_CICLO,
  GET_GRUPO,
  GET_BYID,
  CREATE,
  DELETE,
  UPDATE,
  GET,
};
