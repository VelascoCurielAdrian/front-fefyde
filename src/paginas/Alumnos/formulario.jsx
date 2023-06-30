/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { useQueries } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import {
  DatePickerController,
  SelectFieldController,
  TextFieldController,
} from '../../componentes/Formulario';
import {
  Validacion,
  GET_CICLO,
  GET_GRUPO,
  GET_CARRERA,
} from '../../validaciones/alumnos';
import Header from '../../componentes/Header';
import { TipoEstatus, Semestres, Generos } from '../../helpers/constants';

import useFormQuery from '../../hooks/useFormQuery';
import { ERROR } from '../../configuracion/mensajes';
import { generatePassword } from '../../helpers';
import { ALUMNOS } from '../../configuracion/endpoints';

const dataInicial = {
  apellidoPaterno: '',
  apellidoMaterno: '',
  fechaNacimiento: '',
  cicloEscolarID: '',
  semestre: '',
  password: '',
  userName: '',
  cuenta: '',
  nombre: '',
  correo: '',
  grupoID: '',
  edad: '',
  genero: '',
  carreraID: '',
  telefonoFijo: '',
  telefonoCelular: '',
};

export const Alumno = () => {
  const { id } = useParams();

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validacion),
    defaultValues: dataInicial,
  });

  const cuenta = useWatch({ control, name: 'cuenta' });

  const asignarCredenciales = (cuenta) => {
    if (cuenta) {
      setValue('userName', cuenta);
      setValue('password', generatePassword());
    }
  };

  useEffect(() => {
    !id && asignarCredenciales(cuenta);
  }, [cuenta]);

  const [carrera, cicloEscolar, gruposAlumno] = useQueries({
    queries: [
      {
        queryKey: ['carreras'],
        queryFn: () => GET_CARRERA(),
      },
      {
        queryKey: ['cicloEscolar'],
        queryFn: () => GET_CICLO(),
      },
      {
        queryKey: ['grupos'],
        queryFn: () => GET_GRUPO(),
      },
    ],
  });

  const { accion } = useFormQuery({ id, reset, endpoint: ALUMNOS });

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
        name="alumnos"
        title="Catálogo de alumnos"
        subtitle="Módulo para dar de alta nuevos alumnos"
        handleCreate={handleSubmit(onSubmit)}
        agregar
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-2">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-2 md:col-span-2 md:mt-0 mb-8">
        <form id="herramientas">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-6">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-4">
                  <p className="font-bold text-gray-700">
                    Datos personales
                  </p>
                  <TextFieldController
                    error={errors.nombre}
                    control={control}
                    label="Nombre"
                    name="nombre"
                  />
                  <TextFieldController
                    error={errors.apellidoPaterno}
                    control={control}
                    label="Apellido Paterno"
                    name="apellidoPaterno"
                  />
                  <TextFieldController
                    error={errors.apellidoMaterno}
                    control={control}
                    label="Apellido Materno"
                    name="apellidoMaterno"
                  />
                  <DatePickerController
                    name="fechaNacimiento"
                    control={control}
                    label="Fecha de nacimiento"
                    error={errors.fechaNacimiento}
                  />
                  <div className="grid lg:grid-cols-12 sm:grid-cols-1 gap-2">
                    <div className="lg:col-span-6 md:col-span-12 sm:col-span-12">
                      <TextFieldController
                        error={errors.edad}
                        control={control}
                        label="Edad"
                        name="edad"
                        type="number"
                      />
                    </div>
                    <div className="lg:col-span-6 md:col-span-12 sm:col-span-12">
                      <SelectFieldController
                        label="Género"
                        labelProp="nombre"
                        name="genero"
                        options={Generos}
                        control={control}
                        error={errors.genero}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-4">
                  <p className="font-bold text-gray-700">
                    Datos de contacto y credenciales
                  </p>
                  <TextFieldController
                    error={errors.cuenta}
                    control={control}
                    label="Cuenta institucional"
                    name="cuenta"
                    placeHolder="000000-0"
                  />
                  <TextFieldController
                    error={errors.correo}
                    control={control}
                    label="Correo institucional"
                    name="correo"
                  />
                  <TextFieldController
                    error={errors.telefonoCelular}
                    control={control}
                    label="Teléfono Celular"
                    name="telefonoCelular"
                    type="number"
                  />
                  <TextFieldController
                    error={errors.telefonoFijo}
                    control={control}
                    label="Teléfono fijo"
                    name="telefonoFijo"
                    type="number"
                  />
                  <TextFieldController
                    variant="multiline"
                    control={control}
                    label="Contraseña"
                    name="password"
                  />
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-4">
                  <p className="font-bold text-gray-700">
                    Datos estudiantiles
                  </p>
                  <SelectFieldController
                    label="Carrera"
                    labelProp="nombre"
                    name="carreraID"
                    options={carrera?.data || []}
                    control={control}
                    error={errors.carreraID}
                  />
                  <SelectFieldController
                    label="Ciclo Escolar"
                    labelProp="nombre"
                    name="cicloEscolarID"
                    options={cicloEscolar?.data || []}
                    control={control}
                    error={errors.cicloEscolarID}
                  />
                  <SelectFieldController
                    label="Semestre"
                    labelProp="nombre"
                    name="semestre"
                    options={Semestres}
                    control={control}
                    error={errors.semestre}
                  />
                  <SelectFieldController
                    label="Grupo"
                    labelProp="nombre"
                    name="grupoID"
                    options={gruposAlumno?.data || []}
                    control={control}
                    error={errors.grupoID}
                  />
                  <SelectFieldController
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
