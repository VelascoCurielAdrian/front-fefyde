import React, { useCallback, useMemo } from 'react';
import Proptypes from 'prop-types';
import { styled } from '@mui/material/styles';
import BackupIcon from '@mui/icons-material/Backup';
import Chip from '@mui/material/Chip';

import Table from '../../componentes/Table';
import { EVENTOS } from '../../configuracion/endpoints';
import Estatus from '../../componentes/Estatus/component';

const Container = styled(Chip)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 100,
  borderRadius: 5,
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: '#2D4D7A',
  },
}));

export const Asistencias = ({ editar }) => {
  const handleViewFiles = useCallback((evento) => {
    console.log(evento);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'nombre',
        headerName: 'ALUMNO',
        flex: 1,
        minWidth: 200,
        editable: false,
      },
      {
        field: 'descripcion',
        headerName: 'DESCRIPCION',
        flex: 1,
        minWidth: 200,
        editable: false,
      },
      {
        field: 'impartidor',
        headerName: 'IMPARTIDOR',
        flex: 1,
        minWidth: 120,
        editable: false,
      },
      {
        field: 'ubicacion',
        headerName: 'UBUCACIÓN',
        flex: 1,
        minWidth: 90,
        editable: false,
      },
      {
        field: 'fechas',
        headerName: 'FECHA',
        flex: 1,
        minWidth: 230,
        valueGetter: ({ row }) => `${row?.fecha} Hora: ${row?.hora}`,
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
      {
        field: 'customAction',
        headerName: 'ASISTENCIA',
        flex: 1,
        minWidth: 100,
        editable: false,
        renderCell: ({ row }) => (
          <Container
            size="small"
            label="Ver"
            color="primary"
            onClick={() => handleViewFiles(row)}
            icon={<BackupIcon />}
          />
        ),
      },
    ],
    [handleViewFiles],
  );

  return (
    <Table
      name="asistencias"
      uri={EVENTOS}
      title="Asistencias"
      subtitle="Módulo para consultar las asistencias"
      columns={columns}
      height={370}
      showHeader
      showActions={editar}
    />
  );
};

Asistencias.propTypes = {
  editar: Proptypes.bool,
};

Asistencias.defaultProps = {
  editar: true,
};
