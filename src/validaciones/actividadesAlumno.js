import * as yup from 'yup';

import { MESSAGE_REQUIRED } from '../helpers/constants';

const Validacion = yup.object({
  descripcion: yup.string().required(MESSAGE_REQUIRED),
});

export default Validacion;
