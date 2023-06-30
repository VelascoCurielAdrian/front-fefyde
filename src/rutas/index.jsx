import React, { createRef } from 'react';
import { Home } from '../componentes/Inicio';
import ConfiguracionPerfil from '../componentes/ConfiguracionPerfil';
import { Actividades, Actividad } from '../paginas/Actividades';
import { ActividadAlumnos } from '../paginas/MisActivades';
import { Alumno, Alumnos, AlumnosMultiples } from '../paginas/Alumnos';
import { Perfil } from '../paginas/Perfiles';
import DetalleAlumno from '../paginas/MisActivades/detalle';

const rutas = [
  // Perfil Adminstrador
  {
    path: '/actividades',
    element: <Actividades />,
    nodeRef: createRef(),
    seccionID: 1,
  },
  {
    path: '/actividades/formulario/:id?',
    element: <Actividad />,
    nodeRef: createRef(),
    seccionID: 1,
  },
  {
    path: '/alumnos/multiples',
    element: <AlumnosMultiples />,
    nodeRef: createRef(),
    seccionID: 2,
  },
  {
    path: '/alumnos',
    element: <Alumnos />,
    nodeRef: createRef(),
    seccionID: 2,
  },
  {
    path: '/alumnos/formulario/:id?',
    element: <Alumno />,
    nodeRef: createRef(),
    seccionID: 2,
  },
  {
    path: '/perfiles',
    element: <Perfil />,
    nodeRef: createRef(),
    seccionID: 7,
  },
  {
    path: '/configuracion',
    element: <ConfiguracionPerfil />,
    nodeRef: createRef(),
    seccionID: 3,
  },
  // Perfil Alumno
  {
    path: '/actividades',
    element: <ActividadAlumnos />,
    nodeRef: createRef(),
    seccionID: 4,
  },
  {
    path: '/misActividades',
    element: <DetalleAlumno />,
    nodeRef: createRef(),
    seccionID: 5,
  },
  {
    path: '/configuracion',
    element: <ConfiguracionPerfil />,
    nodeRef: createRef(),
    seccionID: 6,
  },
  {
    path: '/',
    element: <h1>no se encontro la pagina</h1>,
    nodeRef: createRef(),
  },
  {
    path: '*',
    element: <Home />,
    nodeRef: createRef(),
  },
];

export default rutas;
