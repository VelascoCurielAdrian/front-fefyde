import React, { useMemo, useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Chip, Grid } from '@mui/material';
import axiosFiles from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { Viewer } from '@react-pdf-viewer/core';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Table from '../../componentes/Table';
import Dialog from '../../componentes/Dialog';
import Button from '../../componentes/Button';
import TextField from '../../componentes/Formularios/TextField';
import ListaBicatora from '../../componentes/ListasActividadAlumno';
import SelectField from '../../componentes/Formularios/SelectField';

import {
  CALIFICACION_ERROR,
  ERROR,
  SUCCESS_DATA,
} from '../../configuracion/mensajes';
import axios from '../../configuracion/axios';
import endpoints, { ACTIVIDADES_ALUMNO } from '../../configuracion/endpoints';
import { EstadoActividad } from '../../helpers/constants';
import Validacion from '../../validaciones/bitacora';

const ContainerChip = styled(Chip)(() => ({
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
      return <ContainerChip label={value} color={color} size="small" />;
    },
  },
];

export const Bitacora = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const alumno = location.state;
  const queryClient = useQueryClient();
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    control,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { observacionesEvaluador: '' },
    resolver: yupResolver(Validacion),
  });

  const { data } = useQuery({
    queryKey: ['bitacora', id],
    queryFn: () => axios.get(endpoints.base.url(`${ACTIVIDADES_ALUMNO}/bitacora`, id)),
  });

  const actulizarActividad = useMutation({
    mutationFn: (body) => {
      const url = endpoints.base.url(`${ACTIVIDADES_ALUMNO}/admin`);
      return axios.put(url, body);
    },
    onSuccess: () => {
      setOpenModal(false);
      toast.success(SUCCESS_DATA);
      queryClient.invalidateQueries(ACTIVIDADES_ALUMNO);
    },
  });

  const handleOpenModal = useCallback(
    (data) => {
      setOpenModal(true);
      reset(data);
      if (data.archivo) {
        const { archivo } = data;
        axiosFiles
          .get(archivo, {
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
      }
    },
    [reset],
  );

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const newColumns = useMemo(
    () => [
      ...columns,
      {
        field: 'actions',
        type: 'actions',
        headerName: 'ACCIONES',
        width: 100,
        getActions: ({ row }) => [
          <GridActionsCellItem
            onClick={() => handleOpenModal(row)}
            icon={<VisibilityIcon />}
            label="Visualizar"
            color="primary"
          />,
        ],
      },
    ],
    [handleOpenModal],
  );

  const onsubmit = useCallback(
    async (values) => {
      try {
        const { calificacion: califacionAlumno } = values;
        const { calificacion: calificacionUnidad } = values.actividad;
        if (parseFloat(califacionAlumno) > parseFloat(calificacionUnidad)) {
          toast.warn(CALIFICACION_ERROR);
          setError('calificacion', { type: 'maximoCalifacion', message: CALIFICACION_ERROR });
          return;
        }
        await actulizarActividad.mutateAsync(values);
        clearErrors('calificacion');
      } catch (error) {
        toast.error(ERROR);
      }
    },
    [actulizarActividad, clearErrors, setError],
  );

  const goBackAlumnos = useCallback(() => {
    navigate('/alumnos', {
      state: { grupo: alumno.grupo.nombre },
    });
  }, [alumno, navigate]);

  return (
    <>
      <Table
        name="alumnos"
        uri={ACTIVIDADES_ALUMNO}
        columns={newColumns}
        height={370}
        filtros={{ alumnoID: id }}
        mostrarListado={false}
        goBack
        customBackFunction={goBackAlumnos}
        mostrarBuscador
        showHeader
        title={`ACTIVIDADES DE ${alumno?.nombre}`}
        subtitle="Módulo donde podrá ver el progreso de sus créditos"
      />
      <ListaBicatora info={data} />
      <Dialog
        open={openModal}
        maxWidth="lg"
        title="Evidencias"
        subtitle=""
        actions
        loading={actulizarActividad.isLoading && actulizarActividad.isSuccess}
        actionSave={onsubmit}
        handleSubmit={handleSubmit}
        onClose={handleCloseModal}
        actionCancel={handleCloseModal}
      >
        <Grid container spacing={1} mb={4}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Box mb={1}>
              <TextField
                multiline
                rows={4}
                disabled
                label="Observaciones del alumno"
                name="observacionesAlumno"
                control={control}
              />
            </Box>
            <Box mb={1}>
              <TextField
                multiline
                rows={4}
                label="Mis Observaciones"
                name="observacionesEvaluador"
                control={control}
                error={errors.observacionesEvaluador}
              />
            </Box>
            {watch('evaluador') && (
              <Box mb={1}>
                <TextField
                  disabled
                  label="Evaluador"
                  name="evaluador"
                  control={control}
                />
              </Box>
            )}
            <Box mb={1}>
              <SelectField
                label="Estado de la actividad"
                labelProp="nombre"
                valueProp="value"
                name="estadoActividad"
                options={EstadoActividad}
                control={control}
                error={errors.estadoActividad}
              />
            </Box>
            <Box mb={1}>
              <TextField
                label={`Calificacion de ${watch('actividad.calificacion')} por unidad`}
                name="calificacion"
                placeholder="0.00"
                InputProps={{
                  inputProps: {
                    maxLength: 4,
                  },
                }}
                control={control}
                error={errors.calificacion}
              />
            </Box>
            <Box mb={1}>
              <Download>
                {(RenderDownloadProps) => (
                  <Button
                    size="medium"
                    fullWidth
                    label="Descargar archivo"
                    className="bg-gray-700 mt-10"
                    onClick={RenderDownloadProps.onClick}
                    icono={<FileDownloadIcon />}
                  />
                )}
              </Download>
            </Box>
          </Grid>
          <Grid item xs={8}>
            {selectedFile?.path && (
              <Viewer
                fileUrl={selectedFile?.path}
                plugins={[getFilePluginInstance]}
              />
            )}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
