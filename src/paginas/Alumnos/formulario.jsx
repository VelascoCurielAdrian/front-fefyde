import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import SelectField from '../../componentes/Formularios/SelectField';
import TextField from '../../componentes/Formularios/TextField';

import {
  Validacion,
  GET_GRUPO,
} from '../../validaciones/alumnos';
import Header from '../../componentes/Header';
import { TipoEstatus } from '../../helpers/constants';

import useFormQuery from '../../hooks/useFormQuery';
import { ERROR } from '../../configuracion/mensajes';
import { generatePassword } from '../../helpers';
import { ALUMNOS } from '../../configuracion/endpoints';

const defaultValues = {
  estatus: true,
};

export const Alumno = () => {
  const { id } = useParams();

  const {
    reset, control, setValue, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(Validacion), defaultValues,
  });

  const cuenta = useWatch({ control, name: 'cuenta' });

  const asignarCredenciales = useCallback(() => {
    if (cuenta) {
      setValue('userName', cuenta);
      setValue('password', generatePassword());
    }
  }, [cuenta, setValue]);

  const gruposAlumno = useQuery({
    queryKey: ['grupos'],
    queryFn: () => GET_GRUPO(),
  });

  useEffect(() => {
    if (!id) {
      asignarCredenciales(cuenta);
    }
  }, [asignarCredenciales, cuenta, id]);

  const { accion } = useFormQuery({ id, reset, endpoint: ALUMNOS });

  const onSubmit = async (data) => {
    try {
      await accion.mutateAsync(data);
    } catch (e) {
      toast.error(e.data || ERROR);
    }
  };

  return (
    <>
      <Header
        name="alumnos"
        title="Catálogo de alumnos"
        subtitle="Módulo para dar de alta nuevos alumnos"
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
                    error={errors.cuenta}
                    control={control}
                    label="Cuenta institucional"
                    name="cuenta"
                    placeholder="000000-0"
                  />
                  <TextField
                    error={errors.nombre}
                    control={control}
                    label="Nombre"
                    name="nombre"
                  />
                  <TextField
                    error={errors.apellidoPaterno}
                    control={control}
                    label="Apellido Paterno"
                    name="apellidoPaterno"
                  />
                  <TextField
                    error={errors.apellidoMaterno}
                    control={control}
                    label="Apellido Materno"
                    name="apellidoMaterno"
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <TextField
                    error={errors.correo}
                    control={control}
                    label="Correo institucional"
                    name="correo"
                  />
                  <TextField
                    error={errors.telefonoCelular}
                    control={control}
                    label="Teléfono Celular"
                    name="telefonoCelular"
                    type="tel"
                    maxLength={10}
                  />
                  <TextField
                    error={errors.telefonoFijo}
                    control={control}
                    label="Teléfono fijo"
                    name="telefonoFijo"
                    type="tel"
                    maxLength={10}
                  />
                  <TextField
                    variant="multiline"
                    control={control}
                    label="Contraseña"
                    name="password"
                    maxLength={10}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
                  <SelectField
                    label="Grupo"
                    labelProp="nombre"
                    name="grupoID"
                    options={gruposAlumno?.data || []}
                    control={control}
                    error={errors.grupoID}
                  />
                  <SelectField
                    label="Estatus"
                    labelProp="nombre"
                    name="estatus"
                    options={TipoEstatus}
                    control={control}
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
