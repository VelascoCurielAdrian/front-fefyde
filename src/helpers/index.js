/* eslint-disable max-len */
import { exportToExcel } from 'react-json-to-excel';
import axios from '../configuracion/axios';

export const PermisosUsuario = () => {
  const data = JSON.parse(sessionStorage.getItem('token') || localStorage.getItem('token'));
  return data;
};

export const generatePassword = () => {
  const length = 8;
  const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz@';
  let password = '';
  for (let i = 0, letra = caracteres.length; i < length; i += 1) {
    password += caracteres.charAt(Math.floor(Math.random() * letra));
  }
  return password;
};

export const encontrarElementoRepetido = (arreglo) => {
  for (let i = 0; i < arreglo.length - 1; i += 1) {
    const elementoI = arreglo[i];
    if (elementoI !== null && elementoI !== undefined) {
      for (let j = i + 1; j < arreglo.length; j += 1) {
        const elementoJ = arreglo[j];
        if (elementoJ !== null && elementoJ !== undefined) {
          if (elementoI.toLowerCase() === elementoJ.toLowerCase()) {
            return elementoI;
          }
        }
      }
    }
  }
  return null;
};

export const exportExcel = (data, name) => {
  exportToExcel(data, `${name}-${new Date()}`);
};

export const RequestHttp = ({ endpoint, customEndpoints }) => {
  const defaultRequest = {
    getById: (id) => axios.get(endpoint(id)),
    remove: (id) => axios.delete(endpoint(id)),
    post: (body) => axios.post(endpoint(), body),
    put: (body) => axios.put(endpoint(), body),
    get: (filtros) => axios.get(endpoint(), { params: { ...filtros } }),
  };

  return {
    ...defaultRequest,
    ...customEndpoints,
  };
};

export const plural = (palabra) => {
  if (/s$|es$|ies$/.test(palabra)) {
    return palabra;
  }

  return palabra.replace(/y$/, 'ies').replace(/(s|x|z|ch|sh)$/, '$&es').replace(/$/, 's');
};
export const singular = (palabra) => palabra.replace(/ies$/, 'y').replace(/(ses|xes|zes|ches|shes)$/, '$1').replace(/s$/, '');
