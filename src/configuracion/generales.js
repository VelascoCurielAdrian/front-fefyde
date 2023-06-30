import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ERROR } from './mensajes';

export const generales = {
  baseUrldev: 'http://localhost:4001/api/v1',
  // baseUrldev: 'http://192.168.1.53:4001/api/v1',
  // baseUrlProd: 'http://localhost:4001/api/v1',
  admin: 'Administrador',
  carrera: 'Carrera',
  student: 'Estudiante',
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000, // 1 hora
      cacheTime: 3600000, // 1 hora
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      onError: () => toast.error(ERROR),
      networkMode: 'always',
    },
    mutations: {
      networkMode: 'always',
      retry: 3,
      timeout: 10000, // 10 segundos
    },
  },
});
