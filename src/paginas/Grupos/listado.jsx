import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useNavigate } from 'react-router-dom';

import Table from '../../componentes/Table';
import Estatus from '../../componentes/Estatus/component';

import { GRUPOS } from '../../configuracion/endpoints';
import { exportExcel } from '../../helpers';

const Container = styled(Chip)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: 5,
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: '#2D4D7A',
  },
}));

const columns = [
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    flex: 1,
    minWidth: 130,
    editable: false,
  },
  {
    field: 'carrera',
    headerName: 'CRRERA',
    flex: 1,
    minWidth: 330,
    editable: false,
    valueGetter: ({ value }) => value?.nombre || '',
  },
  {
    field: 'aula',
    headerName: 'AULA',
    flex: 1,
    minWidth: 50,
    editable: false,
  },
  {
    field: 'turno',
    headerName: 'TURNO',
    flex: 1,
    minWidth: 110,
    editable: false,
  },
  {
    field: 'generacion',
    headerName: 'GENERACION',
    flex: 1,
    minWidth: 110,
    editable: false,
  },
  {
    field: 'estadoGrupo',
    headerName: 'NIVEL',
    flex: 1,
    minWidth: 110,
    editable: false,
  },
  {
    field: 'estatus',
    headerName: 'ESTATUS',
    flex: 1,
    minWidth: 100,
    editable: false,
    renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
  },
];

export const Grupos = () => {
  const navigate = useNavigate();

  const onNavigateAlumnos = (grupo) => {
    navigate('/alumnos/multiples', {
      state: { grupo },
    });
  };

  const generateExcel = (grupo) => {
    const alumnos = grupo.Alumnos.map((alumno) => {
      const calificaciones = alumno.ActividadAlumnos.map(
        ({ calificacion }) => parseInt(calificacion, 10),
      );

      const sumaCalificaciones = calificaciones
        .reduce((acumulador, calificacion) => acumulador + calificacion, 0);

      const promedio = parseFloat(Math.min((sumaCalificaciones * 10) / 35, 10)).toFixed(2);

      return {
        nombre: alumno.nombre,
        apellidoPaterno: alumno.apellidoPaterno,
        apellidoMaterno: alumno.apellidoMaterno,
        grupo: grupo.nombre,
        telefono: alumno.telefonoCelular,
        correo: alumno.correo,
        promedio,
      };
    });

    exportExcel(alumnos, `Alumnos del - ${grupo.nombre}`);
  };

  return (
    <Table
      name="grupos"
      uri={GRUPOS}
      title="Catálogo de grupos"
      subtitle="Módulo para consultar grupos"
      columns={[
        ...columns,
        {
          field: 'customAction',
          headerName: 'AGREGAR ALUMNOS',
          flex: 1,
          minWidth: 140,
          editable: false,
          renderCell: ({ row }) => (
            <Container
              size="small"
              label="Agregar"
              color="primary"
              onClick={() => onNavigateAlumnos(row)}
              icon={<SchoolIcon />}
            />
          ),
        },
        {
          field: 'actionscalificaciones',
          headerName: 'CALIFICAIONES',
          flex: 1,
          minWidth: 140,
          editable: false,
          renderCell: ({ row }) => (
            <Container
              size="small"
              label="Descargar"
              color="primary"
              onClick={() => generateExcel(row)}
              icon={<HistoryEduIcon />}
            />
          ),
        },
      ]}
      height={370}
      showHeader
      showActions
    />
  );
};
