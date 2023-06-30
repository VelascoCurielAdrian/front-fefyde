/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Estatus from '../../componentes/Estatus/component';
import Table from '../../componentes/Table';
import { MESSAGE_REQUIRED, TiposDuracion } from '../../helpers/constants';
import Dialog from '../../componentes/Dialog';
import UploadFile from '../../componentes/UploadFile';
import { TextFieldController } from '../../componentes/Formulario';
import { RequestHttp } from '../../helpers';
import endpoints from '../../configuracion/endpoints';
import { SUCCESS } from '../../configuracion/mensajes';

const getEstado = (value) => TiposDuracion.find((estado) => estado.id === value).nombre;

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

export const ActividadAlumnos = () => {
  const { get, remove } = RequestHttp({ endpoint: endpoints.actividades.base });
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      yup.object({
        nombre: yup.string().required(MESSAGE_REQUIRED),
      }),
    ),
    defaultValues: { nombre: '' },
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const newColumns = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACCIONES',
      width: 100,
      getActions: () => [
        <GridActionsCellItem
          onClick={handleOpenModal}
          icon={<AiOutlineFilePdf size={16} />}
          label="Subir Evidencia"
        />,
      ],
    },
  ];

  const onsubmit = () => {
    setOpenModal(false);
    toast.success(SUCCESS);
    reset();
  };

  return (
    <>
      <Table
        name="actividades"
        uri={get}
        uriDelete={remove}
        title="Catálogo de actividades"
        subtitle="Módulo para consultar actividades."
        columns={newColumns}
        height={370}
        mostrarListado={false}
        mostrarBuscador
      />
      <Dialog
        open={openModal}
        maxWidth="sm"
        title="Subir Archivo"
        subtitle="Documento expedido y validado por un organismo nacional o internacional certificador."
        actions
        actionSave={() => {}}
        handleSubmit={handleSubmit(onsubmit)}
        onClose={handleCloseModal}
        actionCancel={handleCloseModal}
      >
        <div className="w-full text-center justify-center">
          <UploadFile subtitle="Solo se admiten archivos PDF" />
          <div className="col-span-6 sm:col-span-2 mb-2">
            <TextFieldController
              autoFocus
              label="Descripción de la actividad"
              name="nombre"
              control={control}
              error={errors.nombre}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
