import React, {
  useContext, useEffect, useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';

import ListaBicatora from '../../componentes/ListasActividadAlumno';

import axios from '../../configuracion/axios';
import endpoints, { ACTIVIDADES_ALUMNO } from '../../configuracion/endpoints';
import { AuthContext } from '../../configuracion/auth';

export const DetalleAlumno = () => {
  const { user } = useContext(AuthContext);
  const [infoAlumno, setInfoAlumno] = useState({});

  const { data } = useQuery({
    enabled: Boolean(user?.datosEstudiante?.alumnoID),
    queryKey: ['bitacoraAlumno'],
    queryFn: () => axios.get(
      endpoints.base.url(
        `${ACTIVIDADES_ALUMNO}/bitacora`,
        user?.datosEstudiante?.alumnoID,
      ),
    ),
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (user.datosEstudiante && data) {
      setInfoAlumno(data);
    }
  }, [data, user.datosEstudiante]);

  return (
    <ListaBicatora info={infoAlumno} />
  );
};
