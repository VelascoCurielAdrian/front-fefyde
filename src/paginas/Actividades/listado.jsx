/* eslint-disable import/prefer-default-export */
import React from 'react';
import Estatus from '../../componentes/Estatus/component';
import Table from '../../componentes/Table';

import { TiposDuracion } from '../../helpers/constants';
import { RequestHttp } from '../../helpers';
import endpoints, { ACTIVIDADES } from '../../configuracion/endpoints';

const getEstado = (value) => TiposDuracion.find((estado) => estado.id === value)?.nombre || '';

const columns = [
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    width: 330,
    editable: false,
  },
  {
    field: 'tipoActividad',
    headerName: 'TIPO DE ACTIVIDAD',
    width: 160,
    editable: false,
    valueGetter: ({ value }) => value?.nombre || '',
  },
  {
    field: 'semestre',
    headerName: 'SEMESTRE',
    width: 95,
    editable: false,
  },
  {
    field: 'duracion',
    headerName: 'DURACIÓN',
    width: 100,
    editable: false,
    valueGetter: ({ row }) => `${row.duracion} ${getEstado(row.tipoDuracion)}`,
  },
  {
    field: 'minPuntos',
    headerName: 'MIN PUNTOS',
    width: 130,
    editable: false,
  },
  {
    field: 'maxPuntos',
    headerName: 'MAX PUNTOS',
    width: 140,
    editable: false,
  },
  {
    field: 'estatus',
    headerName: 'ESTATUS',
    width: 100,
    editable: false,
    renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
  },
];

export const Actividades = () => {
  const uri = RequestHttp({ endpoint: endpoints.actividades.base });
  return (
    <Table
      name="actividades"
      uri={uri.get}
      uriDelete={uri.remove}
      title="Catálogo de actividades"
      subtitle="Módulo para consultar actividades"
      columns={columns}
      height={370}
      showHeader
      showActions
    />
  );
};
