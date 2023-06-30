import React, { useContext } from 'react';
import {
  Navigate, RouterProvider, createBrowserRouter,
} from 'react-router-dom';

import { AuthContext, Login } from '../auth';
import RutaPublica from './publicRoutes';
import RutaPrivada from './privateRouter';
import rutas from '../../rutas';

const router = ({ isAuth, data }) => createBrowserRouter([
  {
    element: <RutaPrivada estaAutenticado={isAuth} />,
    children: rutas.map((route) => {
      const ruta = data?.secciones.find((seccionID) => route.seccionID === seccionID);
      if (ruta) {
        return {
          index: route.path === '/',
          path: route.path === '/' ? undefined : route.path,
          element: route.element,
        };
      }

      return {
        index: route.path === '*',
        path: undefined,
        element: route.element,
      };
    }),
  },
  {
    element: <RutaPublica estaAutenticado={isAuth} />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);

const Rutas = () => {
  const { logged, user } = useContext(AuthContext);
  return <RouterProvider router={router({ isAuth: logged, data: user })} />;
};

export default React.memo(Rutas);
