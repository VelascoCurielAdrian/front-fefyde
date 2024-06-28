import React, { createRef } from 'react';
import { Home } from '../componentes/Inicio';
import ConfiguracionPerfil from '../componentes/ConfiguracionPerfil';
import { Actividades, Actividad } from '../paginas/Actividades';
import {
  ActividadAlumnos,
  ActividadAlumno,
  DetalleAlumno,
} from '../paginas/ActividadesAlumno';
import {
  Alumno,
  Alumnos,
  AlumnosMultiples,
  Bitacora,
} from '../paginas/Alumnos';
import { Perfil, Perfiles } from '../paginas/Perfiles';
import { Grupos, Grupo } from '../paginas/Grupos';

import {
  permisosAdmin,
  permisosEstudiante,
  permisosEvaluador,
} from '../helpers/constants';

import { Eventos, Evento, Asistencias } from '../paginas/Eventos';
import Dashboard from '../paginas/Dashboads/evaluador';

const rutas = [
  /** PERMISOS ADMINISTRADOR */
  {
    path: '/dashboard',
    element: <Dashboard />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.dashboard_admin,
  },
  {
    path: '/actividades',
    element: <Actividades />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.actividades_admin,
  },
  {
    path: '/actividades/formulario/:id?',
    element: <Actividad />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.actividades_admin,
  },
  {
    path: '/alumnos/multiples',
    element: <AlumnosMultiples />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.alumnos_admin,
  },
  {
    path: '/alumnos',
    element: <Alumnos />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.alumnos_admin,
  },
  {
    path: '/alumnos/formulario/:id?',
    element: <Alumno />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.alumnos_admin,
  },
  {
    path: '/alumnos/bitacora/:id?',
    element: <Bitacora />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.alumnos_admin,
  },
  {
    path: '/perfiles',
    element: <Perfiles />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.perfiles_admin,
  },
  {
    path: '/perfiles/formulario/:id?',
    element: <Perfil />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.perfiles_admin,
  },
  {
    path: '/grupos',
    element: <Grupos />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.grupos_Admin,
  },
  {
    path: '/grupos/formulario/:id?',
    element: <Grupo />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.grupos_Admin,
  },
  {
    path: '/eventos',
    element: <Eventos />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.eventos_admin,
  },
  {
    path: '/eventos/formulario/:id?',
    element: <Evento />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.eventos_admin,
  },
  {
    path: '/eventos/asistencia',
    element: <Asistencias />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.eventos_admin,
  },
  {
    path: '/configuracion',
    element: <ConfiguracionPerfil />,
    nodeRef: createRef(),
    seccionID: permisosAdmin.configuraciones_admin,
  },
  /** PERMISOS EVALUADOR */
  {
    path: '/dashboard',
    element: <Dashboard />,
    nodeRef: createRef(),
    seccionID: permisosEvaluador.dashboard_evaluador,
  },
  {
    path: '/actividades',
    element: <Actividades editar={false} />,
    nodeRef: createRef(),
    seccionID: permisosEvaluador.actividades_evaluador,
  },
  {
    path: '/alumnos',
    element: <Alumnos editar={false} />,
    nodeRef: createRef(),
    seccionID: permisosEvaluador.alumnos_evaluador,
  },
  {
    path: '/alumnos/bitacora/:id?',
    element: <Bitacora />,
    nodeRef: createRef(),
    seccionID: permisosEvaluador.alumnos_evaluador,
  },
  {
    path: '/configuracion',
    element: <ConfiguracionPerfil />,
    nodeRef: createRef(),
    seccionID: permisosEvaluador.configuraciones_evaluador,
  },
  /** PERMISOS ESTUDIANTE */
  {
    path: '/dashboard',
    element: <DetalleAlumno />,
    nodeRef: createRef(),
    seccionID: permisosEstudiante.dashboard_alumno,
  },
  {
    path: '/actividades',
    element: <ActividadAlumnos />,
    nodeRef: createRef(),
    seccionID: permisosEstudiante.actividades_alumno,
  },
  {
    path: '/actividades/formulario/:id?',
    element: <ActividadAlumno />,
    nodeRef: createRef(),
    seccionID: permisosEstudiante.actividades_alumno,
  },
  {
    path: '/configuracion',
    element: <ConfiguracionPerfil />,
    nodeRef: createRef(),
    seccionID: permisosEstudiante.configuraciones_alumno,
  },
  {
    path: '*',
    element: <Home />,
    nodeRef: createRef(),
  },
];

export default rutas;
