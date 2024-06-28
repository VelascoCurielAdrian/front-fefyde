import * as yup from 'yup';

import { MESSAGE_REQUIRED, NUMBER_POSITIVE } from '../helpers/constants';

const Validacion = yup.object({
  calificacion: yup
    .number()
    .transform((originalValue) => {
      const numericValue = parseFloat(originalValue);
      return Number.isNaN(numericValue) ? undefined : numericValue;
    })
    .positive('Debe ingresar un número positivo')
    .required(MESSAGE_REQUIRED)
    .min(0, NUMBER_POSITIVE),
});

export default Validacion;
