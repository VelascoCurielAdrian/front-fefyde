import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useQuery } from '@tanstack/react-query';
import Header from '../../componentes/Header';
import TextField from '../../componentes/Formularios/TextField';
import SelectField from '../../componentes/Formularios/SelectField';
import DatePicker from '../../componentes/Formularios/DatePicker';

import { TipoEstatus } from '../../helpers/constants';
import { ERROR } from '../../configuracion/mensajes';

import useFormQuery from '../../hooks/useFormQuery';
import endpoints, { ACTIVIDADES, EVENTOS, GRUPOS } from '../../configuracion/endpoints';
import Validacion from '../../validaciones/eventos';
import { GET_GRUPO } from '../../validaciones/alumnos';
import axios from '../../configuracion/axios';

const defaultValues = {
  estatus: true,
};

export const Evento = () => {
  const { id } = useParams();
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ resolver: yupResolver(Validacion), defaultValues });

  const { data: grupos, status } = useQuery({
    queryKey: [GRUPOS],
    queryFn: () => GET_GRUPO(),
  });

  const { data: actividades, status: statusActividad } = useQuery({
    queryKey: [ACTIVIDADES],
    queryFn: () => axios.get(endpoints.base.url(ACTIVIDADES)),
  });

  const { accion } = useFormQuery({ id, reset, endpoint: EVENTOS });

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
        title="Catálogo de eventos"
        subtitle="Módulo para dar de alta nuevos eventos"
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
                    label="Nombre"
                    name="nombre"
                    control={control}
                    error={errors.nombre}
                  />
                  <TextField
                    multiline
                    rows={3}
                    label="Descripción"
                    name="descripcion"
                    control={control}
                    error={errors.descripcion}
                  />
                  <TextField
                    label="Impartidor"
                    name="impartidor"
                    control={control}
                    error={errors.impartidor}
                  />
                </div>
                <div className="col-span-12 lg:col-span-7 md:col-span-12 sm:col-span-12 space-y-2">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                      <TextField
                        label="Ubicación"
                        name="ubicacion"
                        control={control}
                        error={errors.ubicacion}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12">
                      <DatePicker
                        label="Fecha"
                        name="fecha"
                        control={control}
                        error={errors.fecha}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12">
                      <TextField
                        type="time"
                        label="Hora"
                        name="hora"
                        control={control}
                        error={errors.hora}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12">
                      <TextField
                        type="number"
                        label="Capacidad"
                        name="capacidad"
                        control={control}
                        error={errors.capacidad}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12">
                      <SelectField
                        label="Grupo dirigido"
                        labelProp="nombre"
                        name="grupoID"
                        options={status === 'success' ? grupos || [] : []}
                        control={control}
                        error={errors.grupoID}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12">
                      <SelectField
                        label="Actividad Ligada"
                        labelProp="nombre"
                        name="actividadID"
                        options={statusActividad === 'success' ? actividades || [] : []}
                        control={control}
                        error={errors.actividadID}
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
    </>
  );
};
