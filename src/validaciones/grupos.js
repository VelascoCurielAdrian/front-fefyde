import * as yup from 'yup';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const Validacion = yup.object({
  nombre: yup.string().required(MESSAGE_REQUIRED),
  aula: yup.string().required(MESSAGE_REQUIRED),
  generacion: yup.string().required(MESSAGE_REQUIRED),
  carreraID: yup.string().required(MESSAGE_REQUIRED),
  turno: yup.string().required(MESSAGE_REQUIRED),
  estadoGrupo: yup.string().required(MESSAGE_REQUIRED),
});

export default Validacion;
