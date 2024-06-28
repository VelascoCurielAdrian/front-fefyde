import * as yup from 'yup';
import { MESSAGE_REQUIRED, SPACE_NOT } from '../helpers/constants';

const Validacion = yup.object({
  nombre: yup.string().required(MESSAGE_REQUIRED),
  apellidoPaterno: yup
    .string()
    .required(MESSAGE_REQUIRED),
  apellidoMaterno: yup
    .string()
    .required(MESSAGE_REQUIRED),
  userName: yup
    .string()
    .matches(/^\S*$/, SPACE_NOT)
    .required(MESSAGE_REQUIRED),
  password: yup
    .string()
    .required(MESSAGE_REQUIRED),
  correo: yup
    .string()
    .required(MESSAGE_REQUIRED),
  perfilID: yup
    .string()
    .required(MESSAGE_REQUIRED),
});

export default Validacion;
