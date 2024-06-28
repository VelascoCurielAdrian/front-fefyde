import * as yup from 'yup';
import { MESSAGE_REQUIRED, NUMBER_POSITIVE } from '../helpers/constants';

const Validacion = yup.object({
  nombre: yup.string().required(MESSAGE_REQUIRED),
  tipoActividadID: yup.string().required(MESSAGE_REQUIRED),
  calificacion: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED)
    .positive()
    .min(0, NUMBER_POSITIVE),
  maximoUnidades: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED)
    .positive()
    .min(0, NUMBER_POSITIVE),
});

export default Validacion;
