import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BackupIcon from '@mui/icons-material/Backup';
import SchoolIcon from '@mui/icons-material/School';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CommentIcon from '@mui/icons-material/Comment';

import Header from '../../componentes/Header';
import UploadFile from '../../componentes/UploadFile';
import TextField from '../../componentes/Formularios/TextField';
import SelectField from '../../componentes/Formularios/SelectField';

import {
  ARCHIVO_REQUERIDO,
  ERROR,
  LIMITE_ACTIVIDADES,
  MENSAJE_ARCHIVO,
} from '../../configuracion/mensajes';
import endpoints, {
  ACTIVIDADES,
  ACTIVIDADES_ALUMNO,
} from '../../configuracion/endpoints';
import Validacion from '../../validaciones/actividadesAlumno';
import useFormQuery from '../../hooks/useFormQuery';
import axios from '../../configuracion/axios';
import { enumEstadoActividad } from '../../enums/estadoActividad';
import useFiles from '../../hooks/useFiles';

const defaultValues = {
  calificacionUnidad: '0.00',
  maximoUnidades: 0,
  unidadesSubidas: 0,
  calificacion: '0.00',
  observacionesEvaluador: '',
  estadoActividad: enumEstadoActividad.PENDIENTE,
};

export const ActividadAlumno = () => {
  const { id } = useParams();
  const location = useLocation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(Validacion),
  });

  const actividad = watch('actividadID');
  const unidadesSubidas = watch('unidadesSubidas');
  const maximoUnidades = watch('maximoUnidades');
  const { accion, data } = useFormQuery({
    id,
    reset,
    endpoint: ACTIVIDADES_ALUMNO,
    params: { actividadID: location.state?.actividadID },
  });

  const {
    fileUrl, selectedFile, onDrop, pathFile,
  } = useFiles({
    archivo: data?.archivo,
  });
  const { data: actividades } = useQuery({
    queryKey: [ACTIVIDADES],
    queryFn: () => axios.get(endpoints.base.url(ACTIVIDADES)),
  });

  const { data: actividadInfo } = useQuery({
    enabled: Boolean(actividad),
    queryKey: ['ActividadInfoAlumno', actividad],
    queryFn: () => axios.get(
      endpoints.base.url(`${ACTIVIDADES_ALUMNO}/actividadInfo`, actividad),
    ),
  });

  const onSubmit = async (values) => {
    try {
      if (unidadesSubidas === maximoUnidades && !id) {
        toast.warn(LIMITE_ACTIVIDADES);
        return;
      }

      if (!data?.archivo && !selectedFile) {
        toast.warn(ARCHIVO_REQUERIDO);
        return;
      }

      const formData = new FormData();
      if (!pathFile && selectedFile) {
        formData.append('field', selectedFile);
      }
      Object.keys({ ...values, archivo: pathFile }).forEach((key) => {
        formData.append(key, values[key]);
      });

      await accion.mutateAsync(formData);
    } catch (e) {
      toast.error(e.data?.errorMessage || ERROR);
    }
  };

  useEffect(() => {
    if (actividad && actividadInfo) {
      const { numeroEvidencias } = actividadInfo;
      setValue('unidadesSubidas', numeroEvidencias);
    }
  }, [actividad, actividadInfo, setValue]);

  useEffect(() => {
    if (actividad && actividades) {
      const infoActividad = actividades.find(({ id }) => id === actividad);
      if (infoActividad) {
        setValue('calificacionUnidad', infoActividad.calificacion);
        setValue('maximoUnidades', infoActividad.maximoUnidades);
      }
    }
  }, [actividad, actividades, setValue]);

  return (
    <>
      <Header
        name="actividades"
        title="Evidencias de creditos"
        subtitle="Módulo para subir evidencias de las actividades asistidas"
        handleCreate={handleSubmit(onSubmit)}
        agregar={watch('estadoActividad') !== enumEstadoActividad.ACPETADO}
        cancelar={watch('estadoActividad') === enumEstadoActividad.ACPETADO}
      />
      <div className="mt-2 md:col-span-2 md:mt-0 mb-8">
        <div className="bg-slate-200 overflow-hidden shadow sm:rounded-md">
          <div className="px-4 py-5 sm:h1-6 h-full">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-5 md:col-span-12 sm:col-span-12 space-y-2">
                <TextField
                  autoFocus={
                    watch('estadoActividad') === enumEstadoActividad.ACPETADO
                  }
                  multiline
                  rows={4}
                  label="Descripción o observaciones de la actividad"
                  name="observacionesAlumno"
                  control={control}
                  disabled={
                    watch('estadoActividad') === enumEstadoActividad.ACPETADO
                  }
                  error={errors.observacionesAlumno}
                />
                <SelectField
                  label="Seleccione una actividad"
                  labelProp="nombre"
                  name="actividadID"
                  options={actividades || []}
                  control={control}
                  disabled={
                    watch('estadoActividad') === enumEstadoActividad.ACPETADO
                  }
                  error={errors.actividadID}
                />

                <List className="overflow-hidden bg-slate-300 sm:rounded-md">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="bg-slate-700">
                        <EventNoteIcon color="inherit" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <div
                          className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50 bg-sky-600"
                        >
                          Puntos por unidad
                          <p>{watch('calificacionUnidad')}</p>
                        </div>
                      )}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="bg-slate-700">
                        <BackupIcon color="inherit" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <div
                          className={`[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50 ${
                            unidadesSubidas === maximoUnidades && unidadesSubidas > 0
                              ? 'bg-amber-400 text-slate-700'
                              : 'bg-sky-600'
                          }`}
                        >
                          Unidades
                          <p>
                            {`${watch('unidadesSubidas') || 0} de ${
                              watch('maximoUnidades') || 0
                            }`}
                          </p>
                        </div>
                      )}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="bg-slate-700">
                        <SchoolIcon color="inherit" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <div
                          className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50 bg-sky-600"
                        >
                          Calificación
                          <p>{watch('calificacion')}</p>
                        </div>
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="bg-slate-700">
                        <ChecklistIcon color="inherit" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <div
                          className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50 bg-sky-600"
                        >
                          Estatus
                          <p>{watch('estadoActividad')}</p>
                        </div>
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="bg-slate-700">
                        <CommentIcon color="inherit" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Comentarios del evaluador"
                      secondary={watch('observacionesEvaluador')}
                    />
                  </ListItem>
                </List>
              </div>
              <div className="col-span-12 lg:col-span-7 md:col-span-12 sm:col-span-12 space-y-2">
                <h1 className="block mb-1 justify-center text-center de evidencia text-sm font-medium text-slate-700">
                  Archivo
                </h1>
                <UploadFile
                  subtitle={MENSAJE_ARCHIVO}
                  multiple={false}
                  fileSelected={selectedFile}
                  onDrop={onDrop}
                  fileUrl={fileUrl}
                  disabled={
                    watch('estadoActividad') === enumEstadoActividad.ACPETADO
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
