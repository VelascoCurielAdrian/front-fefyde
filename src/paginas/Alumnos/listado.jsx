/* eslint-disable import/prefer-default-export */
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { SiMicrosoftexcel } from 'react-icons/si';
import { GoFileDirectory } from 'react-icons/go';
import { useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';

import DetalleAlumno from './detalle';
import { RequestHttp } from '../../helpers';
import Table from '../../componentes/Table';
import Dialog from '../../componentes/Dialog';
import axios from '../../configuracion/axios';
import { Semestres } from '../../helpers/constants';
import endpoints from '../../configuracion/endpoints';
import Estatus from '../../componentes/Estatus/component';
import { SelectFieldController } from '../../componentes/Formulario';

const dataInicial = {
  grupoID: '',
  cicloEscolarID: '',
  semestre: '',
};

const Container = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 100,
}));

const request = {
  getCiclos: () => axios.get(endpoints.cicloEscolar.base()),
  getGrupos: () => axios.get(endpoints.grupos.base()),
};

export const Alumnos = () => {
  const navigate = useNavigate();
  const [idAlumno, setIdAlumno] = useState();
  const [openFiltros, setOpenFiltros] = useState(false);
  const [openDetalleAlumno, setOpenDetalleAlumno] = useState(false);
  const uri = RequestHttp({ endpoint: endpoints.alumnos.base });
  const [filtros, setFiltros] = useState(dataInicial);
  const { reset, control, handleSubmit } = useForm({
    defaultValues: dataInicial,
  });

  const [cicloEscolar, gruposAlumno] = useQueries({
    queries: [
      { queryKey: ['cicloEscolar'], queryFn: () => request.getCiclos(), retry: 3 },
      { queryKey: ['grupos'], queryFn: () => request.getGrupos(), retry: 3 },
    ],
  });

  const handleOpenFiltros = () => {
    setOpenFiltros(true);
  };

  const handleCloseFiltros = () => {
    setOpenFiltros(false);
    reset();
    setFiltros(dataInicial);
  };

  const onSubmit = (data) => {
    setFiltros(data);
    setOpenFiltros(false);
  };

  const sendLink = () => {
    navigate('/alumnos/multiples', {
      replace: true,
    });
  };

  const handleViewFiles = useCallback((id) => {
    setOpenDetalleAlumno(true);
    setIdAlumno(id);
  }, []);

  const columns = useMemo(() => [
    {
      field: 'cuenta',
      headerName: 'CUENTA',
      width: 90,
      editable: false,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 180,
      valueGetter: ({ row }) => `${row?.nombre} ${row?.apellidoPaterno} ${row?.apellidoMaterno}`,
      editable: false,
    },
    {
      field: 'correo',
      headerName: 'CORREO',
      width: 220,
      editable: false,
    },
    {
      field: 'edad',
      headerName: 'EDAD',
      width: 60,
      editable: false,
    },
    {
      field: 'semestre',
      headerName: 'SEMESTRE',
      width: 90,
      editable: false,
    },
    {
      field: 'grupoID',
      headerName: 'GRUPO',
      width: 90,
      editable: false,
      valueGetter: ({ row }) => row?.grupo?.nombre,
    },
    {
      field: 'cicloEscolarID',
      headerName: 'CICLO',
      width: 120,
      editable: false,
      valueGetter: ({ row }) => row?.cicloEscolar?.nombre,
    },
    {
      field: 'estatus',
      headerName: 'ESTATUS',
      width: 100,
      editable: false,
      renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
    },
    {
      field: 'customAction',
      headerName: 'ARCHIVOS',
      width: 100,
      editable: false,
      renderCell: ({ row }) => (
        <Container
          size="small"
          label="Ver"
          color="secondary"
          onClick={() => handleViewFiles(row.id)}
          icon={<GoFileDirectory />}
        />
      ),
    },
  ], [handleViewFiles]);

  return (
    <>
      <Table
        fileExport
        iconFileExport={<SiMicrosoftexcel size={16} />}
        titleFileExport="Exportar Alumnos"
        handleFileExport={handleOpenFiltros}
        fileImport
        iconFileImport={<SiMicrosoftexcel size={16} />}
        titleFileImport="Importar Alumnos"
        handleFileImport={sendLink}
        mostrarFiltros
        filtros={filtros}
        handleFilter={handleOpenFiltros}
        name="alumnos"
        uri={uri.get}
        uriDelete={uri.remove}
        title="Catálogo de alumnos"
        subtitle="Módulo para consultar alumnos"
        columns={columns}
        height={370}
        showHeader
        showActions
      />
      <Dialog
        open={openFiltros}
        maxWidth="xs"
        title="Filtros Alumnos"
        actions
        labelButtonSave="Aplicar"
        actionSave={onSubmit}
        handleSubmit={handleSubmit}
        onClose={handleCloseFiltros}
        actionCancel={handleCloseFiltros}
      >
        <>
          <div className="mb-3">
            <SelectFieldController
              label="Grupo"
              labelProp="nombre"
              name="grupoID"
              options={gruposAlumno.status === 'success' ? gruposAlumno.data : []}
              control={control}
            />
          </div>
          <div className="mb-3">
            <SelectFieldController
              label="Smestre"
              labelProp="nombre"
              name="semestre"
              options={Semestres}
              control={control}
            />
          </div>
          <div className="mb-3" style={{ marginBottom: '6px' }}>
            <SelectFieldController
              label="Ciclo Escolar"
              labelProp="nombre"
              name="cicloEscolarID"
              options={cicloEscolar.status === 'success' ? cicloEscolar.data : []}
              control={control}
            />
          </div>
        </>
      </Dialog>
      <DetalleAlumno
        open={openDetalleAlumno}
        id={idAlumno}
        onClose={() => setOpenDetalleAlumno(false)}
      />
    </>
  );
};
