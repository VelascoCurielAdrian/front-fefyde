import * as yup from 'yup';
import { MESSAGE_REQUIRED, NUMBER_POSITIVE } from '../helpers/constants';

const Validacion = yup.object({
  nombre: yup.string().required(MESSAGE_REQUIRED),
  descripcion: yup.string().required(MESSAGE_REQUIRED),
  impartidor: yup.string().required(MESSAGE_REQUIRED),
  ubicacion: yup.string().required(MESSAGE_REQUIRED),
  fecha: yup.string().required(MESSAGE_REQUIRED),
  hora: yup.string().required(MESSAGE_REQUIRED),
  capacidad: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(MESSAGE_REQUIRED)
    .positive()
    .min(0, NUMBER_POSITIVE),
  grupoID: yup.string().required(MESSAGE_REQUIRED),
  actividadID: yup.string().required(MESSAGE_REQUIRED),
});

export default Validacion;
