// Initial Data
import * as yup from 'yup';
import { EMAIL_INVALID, MESSAGE_REQUIRED } from '../../helpers/constants';

export const defaultValues = {
  apellidoPaterno: '',
  apellidoMaterno: '',
  fechaNacimiento: '',
  cicloEscolarID: '',
  semestre: '',
  password: '',
  userName: '',
  cuenta: '',
  nombre: '',
  correo: '',
  grupoID: '',
  edad: '',
  genero: '',
  carreraID: '',
  telefonoFijo: '',
  telefonoCelular: '',
  estatus: true,
};

export const Validacion = yup.object({
  cuenta: yup.string().required(MESSAGE_REQUIRED),
  nombre: yup.string().required(MESSAGE_REQUIRED),
  apellidoPaterno: yup.string().required(MESSAGE_REQUIRED),
  apellidoMaterno: yup.string().required(MESSAGE_REQUIRED),
  correo: yup.string().email(EMAIL_INVALID).required(MESSAGE_REQUIRED),
  fechaNacimiento: yup.string().required(MESSAGE_REQUIRED),
  telefonoFijo: yup.string().required(MESSAGE_REQUIRED),
  telefonoCelular: yup.string().required(MESSAGE_REQUIRED),
  cicloEscolarID: yup.string().max(10).required(MESSAGE_REQUIRED),
  carreraID: yup.string().required(MESSAGE_REQUIRED),
  semestre: yup.string().required(MESSAGE_REQUIRED),
  grupoID: yup.string().required(MESSAGE_REQUIRED),
  edad: yup.string().required(MESSAGE_REQUIRED),
  genero: yup.string().required(MESSAGE_REQUIRED),
});
