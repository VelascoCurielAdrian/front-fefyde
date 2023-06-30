import * as yup from 'yup';

import axios from '../configuracion/axios';
import endpoints from '../configuracion/endpoints';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const CREATE = (body) => axios.post(endpoints.tipoActividades.base(), body);

const DELETE = () => axios.get(endpoints.tipoActividades.base());

const UPDATE = (body) => axios.put(endpoints.tipoActividades.base(), body);

const GET = () => axios.get(endpoints.tipoActividades.base());

const GET_BYID = (id) => axios.get(endpoints.tipoActividades.base(id));

export const Validacion = yup.object({
  nombre: yup.string().required(MESSAGE_REQUIRED),
});

export const TipoActividatesActions = {
  CREATE,
  DELETE,
  UPDATE,
  GET,
  GET_BYID,
};
