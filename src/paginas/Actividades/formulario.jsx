import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import AddCommentIcon from '@mui/icons-material/AddComment';
import Divider from '@mui/material/Divider';

import Header from '../../componentes/Header';
import Button from '../../componentes/Button';
import TextField from '../../componentes/Formularios/TextField';
import SelectField from '../../componentes/Formularios/SelectField';

import { TipoEstatus } from '../../helpers/constants';
import { TipoActividatesActions } from '../../validaciones/tipoActividades';
import { TipoActividad } from '../TipoActividades/formulario';
import { ERROR, PUNTOS_INVALIDOS } from '../../configuracion/mensajes';

import useFormQuery from '../../hooks/useFormQuery';
import { ACTIVIDADES } from '../../configuracion/endpoints';
import Validacion from '../../validaciones/actividades';

const defaultValues = {
  estatus: true,
};

export const Actividad = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const {
    control, formState: { errors }, reset, handleSubmit,
  } = useForm({ resolver: yupResolver(Validacion), defaultValues });

  const { accion } = useFormQuery({ id, reset, endpoint: ACTIVIDADES });

  const { data, status } = useQuery({
    queryKey: ['tipoActividades'],
    queryFn: TipoActividatesActions.GET,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const { minPuntos, maxPuntos } = data;
      if (minPuntos > maxPuntos) {
        toast.warn(PUNTOS_INVALIDOS);
      } else {
        await accion.mutateAsync(data);
      }
    } catch (e) {
      toast.error(e.data?.errorMessage || ERROR);
    }
  };

  return (
    <>
      <Header
        name="actividades"
        title="Catálogo de actividades"
        subtitle="Módulo para dar de alta nuevas actividades"
        handleCreate={handleSubmit(onSubmit)}
        agregar
      />
      <div className="md:col-span-2 md:mt-0 mb-8">
        <form id="herramientas">
          <div className="overflow-hidden bg-slate-200 rounded-2xl">
            <div className="px-4 py-5 sm:p-6 h-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-5 md:col-span-12 sm:col-span-12 space-y-2">
                  <TextField
                    autoFocus
                    multiline
                    rows={4}
                    label="Nombre"
                    name="nombre"
                    control={control}
                    error={errors.nombre}
                  />
                  <SelectField
                    label="Tipo de actividad"
                    labelProp="nombre"
                    name="tipoActividadID"
                    options={status === 'success' ? data : []}
                    control={control}
                    error={errors.tipoActividadID}
                  />
                  {!id && (
                    <>
                      <Divider textAlign="center">
                        <p htmlFor="agregar" className="block mb-1 text-sm font-medium text-slate-700"> O </p>
                      </Divider>
                      <Button
                        size="medium"
                        label="Agregar un nuevo tipo de actividad"
                        fullWidth
                        onClick={handleClickOpen}
                        icono={<AddCommentIcon size={22} />}
                      />
                    </>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-7 md:col-span-12 sm:col-span-12 space-y-2">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12">
                      <TextField
                        type="number"
                        label="Calificación por unidad"
                        name="calificacion"
                        control={control}
                        error={errors.calificacion}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12">
                      <TextField
                        type="number"
                        label="Máximo de unidades o evidencias"
                        name="maximoUnidades"
                        control={control}
                        error={errors.maximoUnidades}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12">
                      <SelectField
                        label="Estatus"
                        labelProp="nombre"
                        name="estatus"
                        options={TipoEstatus}
                        control={control}
                        error={errors.estatus}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <TipoActividad open={open} handleClose={handleClose} />
    </>
  );
};
