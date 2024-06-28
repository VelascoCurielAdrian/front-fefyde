import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../componentes/Table';
import Estatus from '../../componentes/Estatus/component';

import { ACTIVIDADES } from '../../configuracion/endpoints';

const columns = [
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    flex: 1,
    minWidth: 330,
    editable: false,
  },
  {
    field: 'tipoActividad',
    headerName: 'TIPO DE ACTIVIDAD',
    flex: 1,
    minWidth: 160,
    editable: false,
    valueGetter: ({ value }) => value?.nombre || '',
  },
  {
    field: 'calificacion',
    headerName: 'CALIFICACIÓN',
    flex: 1,
    minWidth: 130,
    editable: false,
  },
  {
    field: 'maximoUnidades',
    headerName: 'MAX UNIDADES',
    flex: 1,
    minWidth: 140,
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

export const Actividades = ({ editar }) => (
  <Table
    name="actividades"
    uri={ACTIVIDADES}
    title="Catálogo de actividades"
    subtitle="Módulo para consultar actividades"
    columns={columns}
    height={370}
    showHeader
    showActions={editar}
  />
);

Actividades.propTypes = {
  editar: PropTypes.bool,
};

Actividades.defaultProps = {
  editar: true,
};
