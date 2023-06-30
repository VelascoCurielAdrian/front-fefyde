/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { BiBookAdd } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { SelectFieldController, TextFieldController } from '../../componentes/Formulario';
import { TipoEstatus, Semestres, TiposDuracion } from '../../helpers/constants';
import { TipoActividatesActions } from '../../validaciones/tipoActividades';
import { TipoActividad } from '../TipoActividades/formulario';
import { ERROR } from '../../configuracion/mensajes';
import Header from '../../componentes/Header';
import Button from '../../componentes/Button';

import useFormQuery from '../../hooks/useFormQuery';
import { ACTIVIDADES } from '../../configuracion/endpoints';
import Validacion from '../../validaciones/actividades';

const defaultValues = {
  nombre: '',
  tipoActividadID: '',
  semestre: '',
  tipoDuracion: '',
  duracion: '',
  minPuntos: '',
  maxPuntos: '',
  estatus: true,
};

export const Actividad = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const {
    reset, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(Validacion), defaultValues,
  });

  const tipoActividades = useQuery({
    queryKey: ['tipoActividades'],
    queryFn: TipoActividatesActions.GET,
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const { accion } = useFormQuery({ id, reset, endpoint: ACTIVIDADES });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await accion.mutateAsync(data);
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
      <>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-2">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0 mb-8">
          <form id="herramientas">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 h-full">
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-3">
                    <TextFieldController
                      autoFocus
                      variant="multiline"
                      error={errors.nombre}
                      control={control}
                      label="Nombre"
                      name="nombre"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
                    <SelectFieldController
                      label="Tipo de actividad"
                      labelProp="nombre"
                      name="tipoActividadID"
                      options={tipoActividades.data || []}
                      control={control}
                      error={errors.tipoActividadID}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12">
                    <Typography className="block text-sm mb-1 font-medium text-gray-700">
                      Gestionar Tipos de actividades
                    </Typography>
                    <Button
                      size="medium"
                      label="Agregar"
                      fullWidth
                      className="bg-gray-700"
                      onClick={handleClickOpen}
                      icono={<BiBookAdd size={22} />}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-1 md:col-span-12 sm:col-span-12 space-y-3">
                    <SelectFieldController
                      label="Semestre"
                      labelProp="nombre"
                      name="semestre"
                      options={Semestres}
                      control={control}
                      error={errors.semestre}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-1 md:col-span-12 sm:col-span-12 space-y-3">
                    <SelectFieldController
                      label="Tipo de duración"
                      labelProp="nombre"
                      name="tipoDuracion"
                      options={TiposDuracion}
                      control={control}
                      error={errors.tipoDuracion}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-1 md:col-span-12 sm:col-span-12 space-y-3">
                    <TextFieldController
                      error={errors.duracion}
                      control={control}
                      label="Duración de la actividad"
                      name="duracion"
                      type="number"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-1 md:col-span-12 sm:col-span-12 space-y-3">
                    <SelectFieldController
                      label="Estatus"
                      labelProp="nombre"
                      name="estatus"
                      options={TipoEstatus}
                      control={control}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
                    <TextFieldController
                      error={errors.minPuntos}
                      control={control}
                      type="number"
                      label="Mínimo de puntos"
                      name="minPuntos"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
                    <TextFieldController
                      error={errors.maxPuntos}
                      control={control}
                      type="number"
                      label="Máximo de puntos"
                      name="maxPuntos"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
      <TipoActividad open={open} handleClose={handleClose} />
    </>
  );
};
