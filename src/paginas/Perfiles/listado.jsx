import React from 'react';

import Table from '../../componentes/Table';
import Estatus from '../../componentes/Estatus/component';

import { INDENTIDADES } from '../../configuracion/endpoints';

const columns = [
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    flex: 1,
    minWidth: 270,
    editable: false,
    valueGetter: ({ row }) => `${row?.nombre} ${row?.apellidoPaterno} ${row.apellidoMaterno}` || '',
  },

  {
    field: 'usuario',
    headerName: 'USUARIO',
    flex: 1,
    minWidth: 90,
    editable: false,
    valueGetter: ({ value }) => value?.usuario || '',
  },
  {
    field: 'correo',
    headerName: 'CORREO',
    flex: 1,
    minWidth: 250,
    editable: false,
  },
  {
    field: 'perfil',
    headerName: 'PRIORIDAD',
    flex: 1,
    minWidth: 140,
    editable: false,
    valueGetter: ({ value }) => value?.nombre || '',
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

export const Perfiles = () => (
  <Table
    name="identidades"
    uri={INDENTIDADES}
    title="Catálogo de perfiles"
    subtitle="Módulo para consultar perfiles"
    columns={columns}
    height={370}
    showHeader
    showActions
  />
);
