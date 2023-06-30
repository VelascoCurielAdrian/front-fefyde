/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const validacion = yup.object({
  usuario: yup
    .string('Ecriba el usuario')
    .required('El usuario es requerido'),
  password: yup
    .string('Escriba la contraseña')
    .required('La contraseña es requerida'),
});
