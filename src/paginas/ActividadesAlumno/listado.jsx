import React, { useState, useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import axiosFiles from 'axios';
import * as yup from 'yup';

import Table from '../../componentes/Table';
import { MESSAGE_REQUIRED } from '../../helpers/constants';
import Dialog from '../../componentes/Dialog';
import UploadFile from '../../componentes/UploadFile';
import TextField from '../../componentes/Formularios/TextField';

import endpoints, {
  ACTIVIDADES_ALUMNO,
} from '../../configuracion/endpoints';
import {
  ARCHIVO_REQUERIDO,
  ERROR,
  SUCCESS,
} from '../../configuracion/mensajes';
import axios from '../../configuracion/axios';
import { enumEstadoActividad } from '../../enums/estadoActividad';
import { generales } from '../../configuracion/generales';

const Container = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 100,
  fontWeight: 'bold',
  borderRadius: 5,
}));

const columns = [
  {
    field: 'actividad',
    headerName: 'ACTIVIDAD',
    flex: 1,
    minWidth: 330,
    editable: false,
    valueGetter: ({ value }) => value?.nombre || '',
  },
  {
    field: 'observacionesAlumno',
    headerName: 'OBSERVACIONES',
    flex: 1,
    minWidth: 330,
    editable: false,
  },
  {
    field: 'calificacion',
    headerName: 'CALIFICACIÓN',
    flex: 1,
    minWidth: 110,
    editable: false,
  },
  {
    field: 'estadoActividad',
    headerName: 'ESTADO',
    flex: 1,
    minWidth: 140,
    renderCell: ({ value }) => {
      let color;
      if (value === 'Pendiente') {
        color = 'info';
      } else if (value === 'Rechazado') {
        color = 'error';
      } else if (value === 'Aceptado') {
        color = 'success';
      } else {
        color = 'info';
      }
      return <Container label={value} color={color} size="small" />;
    },
  },
];

export const ActividadAlumnos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: null,
      calificacion: 0,
      estadoActividad: enumEstadoActividad.PENDIENTE,
    },
    resolver: yupResolver(
      yup.object({
        actividadID: yup.number().optional(),
        descripcion: yup.string().required(MESSAGE_REQUIRED),
      }),
    ),
  });

  const { data } = useQuery({
    enabled: openModal,
    queryKey: ['evidencias', watch('actividadID')],
    queryFn: () => axios.get(endpoints.base.url(ACTIVIDADES_ALUMNO, watch('actividadID'))),
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (data || watch('actividadID')) {
      if (data?.archivo) {
        const { archivo } = data;
        setValue('id', data.id);
        setValue('descripcion', data.descripcion);
        axiosFiles
          .get(`${generales.baseUrldev}/${archivo}`, {
            responseType: 'blob',
          })
          .then((response) => {
            const blob = new Blob([response.data], {
              type: response.headers['content-type'],
            });

            const archivoInfo = {
              path: archivo,
              name: archivo,
              size: blob.size,
              type: blob.type,
            };
            setSelectedFile(archivoInfo);
          })
          .catch((error) => {
            toast.error('Error al descargar el archivo:', error);
          });
      } else {
        setSelectedFile(null);
      }
    }
  }, [data, watch, setValue]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFile(null);
    reset();
  };

  const subirEvidencia = useMutation({
    mutationFn: (body) => {
      const url = endpoints.base.url(ACTIVIDADES_ALUMNO);
      if (watch('id')) {
        return axios.put(url, body);
      }
      return axios.post(url, body);
    },
    onSuccess: () => {
      handleCloseModal();
      toast.success(SUCCESS);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 1000000) {
      toast.error('El tamaño del archivo no debe exceder 1 MB.');
    }

    setSelectedFile(file);
  }, []);

  const onsubmit = useCallback(
    async (values) => {
      try {
        if (!selectedFile) {
          toast.warn(ARCHIVO_REQUERIDO);
          return;
        }

        const formData = new FormData();
        formData.append('field', selectedFile);
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        await subirEvidencia.mutateAsync(formData);
      } catch (error) {
        toast.error(ERROR);
      }
    },
    [selectedFile, subirEvidencia],
  );

  return (
    <>
      <Table
        name="actividadesAlumno"
        uri={ACTIVIDADES_ALUMNO}
        title="Catálogo de mis actividades"
        subtitle="Módulo para consultar mis actividades."
        columns={columns}
        height={370}
        showHeader
        showActions
      />
      <Dialog
        open={openModal}
        maxWidth="sm"
        title="Subir Evidencia"
        subtitle="Constancia de participación y/o representación en autoridades colegiadas, la cual incluya logo de la institución,
        fecha de inicio y término de la participación, descripción de la actividad, firma y sello de las autoridades.
        Nota de Seguridad: Este archivo se renombrará automáticamente por motivos de seguridad al guardar o distribuirlo.
        "
        actions
        actionSave={onsubmit}
        handleSubmit={handleSubmit}
        onClose={handleCloseModal}
        actionCancel={handleCloseModal}
        labelButtonSave={watch('id') ? 'Actualizar' : 'Guardar'}
      >
        <div className="w-full text-center justify-center">
          <UploadFile
            title="Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos."
            subtitle=""
            multiple={false}
            fileSelected={selectedFile}
            onDrop={onDrop}
          />
          <div className="col-span-6 sm:col-span-2 mb-2">
            <TextField
              autoFocus
              label="Descripción de la actividad"
              name="descripcion"
              control={control}
              error={errors.descripcion}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
