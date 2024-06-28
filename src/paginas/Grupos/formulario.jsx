import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Header from '../../componentes/Header';
import TextField from '../../componentes/Formularios/TextField';
import SelectField from '../../componentes/Formularios/SelectField';

import { ERROR, PUNTOS_INVALIDOS } from '../../configuracion/mensajes';

import useFormQuery from '../../hooks/useFormQuery';
import endpoints, { GRUPOS, CARRERAS } from '../../configuracion/endpoints';
import Validacion from '../../validaciones/grupos';
import axios from '../../configuracion/axios';
import { EstadoGrupo, HorarioAlumnos, TipoEstatus } from '../../helpers/constants';

const defaultValues = {
  estatus: true,
};

export const Grupo = () => {
  const { id } = useParams();
  const {
    control, formState: { errors }, reset, handleSubmit,
  } = useForm({ resolver: yupResolver(Validacion), defaultValues });

  const { accion } = useFormQuery({ id, reset, endpoint: GRUPOS });

  const carrera = useQuery({
    queryKey: ['carreras'],
    queryFn: () => axios.get(endpoints.base.url(CARRERAS)),
  });

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
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <TextField
                    autoFocus
                    label="Nombre"
                    name="nombre"
                    control={control}
                    error={errors.nombre}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <TextField
                    autoFocus
                    label="Aula"
                    name="aula"
                    control={control}
                    error={errors.aula}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <TextField
                    autoFocus
                    label="Generación"
                    name="generacion"
                    control={control}
                    error={errors.generacion}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <SelectField
                    label="Carrera"
                    labelProp="nombre"
                    name="carreraID"
                    options={carrera?.data || []}
                    control={control}
                    error={errors.carreraID}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <SelectField
                    label="Turno"
                    labelProp="nombre"
                    name="turno"
                    valueProp="value"
                    options={HorarioAlumnos}
                    control={control}
                    error={errors.turno}
                  />
                </div>
                <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
                  <SelectField
                    label="Nivel"
                    labelProp="nombre"
                    valueProp="value"
                    name="estadoGrupo"
                    options={EstadoGrupo}
                    control={control}
                    error={errors.estadoGrupo}
                  />
                </div>
                <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
                  <SelectField
                    label="Estaus"
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
        </form>
      </div>
    </>
  );
};
