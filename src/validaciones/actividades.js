import * as yup from 'yup';
import { isNaN } from 'lodash';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const Validacion = yup.object({
  nombre: yup.string().required(MESSAGE_REQUIRED),
  tipoActividadID: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  semestre: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  tipoDuracion: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  duracion: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  minPuntos: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
  maxPuntos: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED),
});

export default Validacion;
