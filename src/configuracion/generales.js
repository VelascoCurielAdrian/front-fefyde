import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ERROR } from './mensajes';

export const generales = {
  // baseUrldev: 'http://localhost:4001',
  // ip del servidor
  baseUrldev: 'https://sistemasfic.uas.edu.mx',
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
    },
  },
});
