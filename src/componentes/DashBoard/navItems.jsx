import React from 'react';
import { FcConferenceCall, FcInspection } from 'react-icons/fc';
import { BsPersonFillCheck } from 'react-icons/bs';
import { sizeIcon } from '../../helpers/constants';

const NavItems = [
  // Perfil Adminstrador
  {
    seccionID: 1,
    icon: <FcInspection size={sizeIcon} />,
    url: 'actividades',
    label: 'Actividades',
  },
  {
    seccionID: 2,
    icon: <FcConferenceCall size={sizeIcon} />,
    url: 'alumnos',
    label: 'Alumnos',
  },
  {
    seccionID: 7,
    icon: <BsPersonFillCheck size={sizeIcon} />,
    url: 'perfiles',
    label: 'Perfiles',
  },
  // Perfil Alumno
  {
    seccionID: 4,
    icon: <FcInspection size={sizeIcon} />,
    url: 'actividades',
    label: 'Actividades',
  },
  {
    seccionID: 5,
    icon: <FcInspection size={sizeIcon} />,
    url: 'misActividades',
    label: 'Mis Actividades',
  },
];

export default NavItems;
