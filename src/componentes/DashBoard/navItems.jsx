import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

import {
  permisosAdmin,
  permisosEstudiante,
  permisosEvaluador,
} from '../../helpers/constants';

const NavItems = [
  // Perfil Adminstrador
  {
    seccionID: permisosAdmin.actividades_admin,
    icon: <AssignmentIcon />,
    url: 'actividades',
    label: 'Actividades',
  },
  {
    seccionID: permisosAdmin.alumnos_admin,
    icon: <SchoolIcon />,
    url: 'alumnos',
    label: 'Alumnos',
  },
  {
    seccionID: permisosAdmin.perfiles_admin,
    icon: <PermContactCalendarIcon />,
    url: 'perfiles',
    label: 'Perfiles',
  },
  {
    seccionID: permisosAdmin.grupos_Admin,
    icon: <GroupsIcon />,
    url: 'grupos',
    label: 'Grupos',
  },
  {
    seccionID: permisosAdmin.eventos_admin,
    icon: <ChecklistRtlIcon />,
    url: 'eventos',
    label: 'Asistencia y eventos',
  },
  // Perfil Evaluador
  {
    seccionID: permisosEvaluador.actividades_evaluador,
    icon: <AssignmentIcon />,
    url: 'actividades',
    label: 'Actividades',
  },
  {
    seccionID: permisosEvaluador.alumnos_evaluador,
    icon: <SchoolIcon />,
    url: 'alumnos',
    label: 'Alumnos',
  },
  // Perfil Alumno
  {
    seccionID: permisosEstudiante.actividades_alumno,
    icon: <AssignmentIcon />,
    url: 'actividades',
    label: 'Actividades',
  },
];

export default NavItems;
