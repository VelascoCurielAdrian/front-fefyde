import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import Groups2Icon from '@mui/icons-material/Groups2';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  InputAdornment,
  IconButton,
} from '@mui/material';

import Header from '../../componentes/Header';
import TextField from '../../componentes/Formularios/TextField';
import SelectField from '../../componentes/Formularios/SelectField';

import { TipoEstatus } from '../../helpers/constants';
import { ERROR, GRUPO_REQUERIDO } from '../../configuracion/mensajes';

import useFormQuery from '../../hooks/useFormQuery';
import endpoints, {
  CARRERAS,
  INDENTIDADES,
  PERFILES,
} from '../../configuracion/endpoints';
import Validacion from '../../validaciones/perfiles';
import EmptyRows from '../../componentes/EmptyRows/component';
import axios from '../../configuracion/axios';

const defaultValues = {
  estatus: true,
};

export const Perfil = () => {
  const { id } = useParams();
  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ resolver: yupResolver(Validacion), defaultValues });

  const { accion, data } = useFormQuery({ id, reset, endpoint: INDENTIDADES });

  const [perfiles, carreras] = useQueries({
    queries: [
      {
        queryKey: ['perfiles'],
        queryFn: () => axios.get(endpoints.base.url(PERFILES)),
      },
      {
        queryKey: ['carreras'],
        queryFn: () => axios.get(endpoints.base.url(CARRERAS)),
      },
    ],
  });

  const carrerasConGrupos = useMemo(() => {
    if (carreras.data) {
      return carreras.data.flatMap((carrera) => carrera.Grupos.map((grupo) => grupo.id));
    }
    return [];
  }, [carreras.data]);

  const onSubmit = async (data) => {
    try {
      if (gruposSeleccionados.length === 0) {
        toast.warn(GRUPO_REQUERIDO);
        return;
      }

      const gruposActivos = carrerasConGrupos.filter(
        (grupo) => gruposSeleccionados.includes(grupo),
      );

      const gruposInactivos = carrerasConGrupos.filter(
        (grupo) => !gruposSeleccionados.includes(grupo),
      );

      const nuevoGrupos = [
        ...gruposActivos.map((grupo) => ({ grupoID: grupo, activo: true })),
        ...gruposInactivos.map((grupo) => ({ grupoID: grupo, activo: false })),
      ];

      await accion.mutateAsync({
        ...data,
        GruposIdentidad: nuevoGrupos,
      });
    } catch (e) {
      toast.error(e.data?.errorMessage || ERROR);
    }
  };

  const seleccionarGrupo = (grupo) => {
    const indiceActual = gruposSeleccionados.indexOf(grupo);
    const nuevoGrupo = [...gruposSeleccionados];

    if (indiceActual === -1) {
      nuevoGrupo.push(grupo);
    } else {
      nuevoGrupo.splice(indiceActual, 1);
    }
    const allvalues = carreras.data.flatMap((carrera) => carrera.Grupos.map((grupo) => grupo.id));

    setGruposSeleccionados(nuevoGrupo);
    setCheckedTodos(nuevoGrupo.length === allvalues.length);
  };

  const handleCheckedTodos = () => {
    const allvalues = carreras.data.flatMap((carrera) => carrera.Grupos.map((grupo) => grupo.id));
    if (checkedTodos) {
      setGruposSeleccionados([]);
    } else {
      setGruposSeleccionados(allvalues);
    }
    setCheckedTodos(!checkedTodos);
  };

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (data) {
      const { GruposIdentidad } = data;
      setCheckedTodos(GruposIdentidad.length === carrerasConGrupos.length);
      setGruposSeleccionados(GruposIdentidad.map((grupo) => grupo.grupoID));
    }
  }, [carrerasConGrupos, data]);

  return (
    <>
      <Header
        name="perfiles"
        title="Catálogo de perfiles"
        subtitle="Módulo para dar de alta nuevos perfiles"
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
                  <TextField
                    label="Apellido Paterno"
                    name="apellidoPaterno"
                    control={control}
                    error={errors.apellidoPaterno}
                  />
                  <TextField
                    label="Apellido Materno"
                    name="apellidoMaterno"
                    control={control}
                    error={errors.apellidoMaterno}
                  />
                  <TextField
                    label="Usuario"
                    name="userName"
                    control={control}
                    error={errors.userName}
                  />
                  <TextField
                    label="Contraseña"
                    control={control}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    error={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Correo electrónico"
                    name="correo"
                    control={control}
                    error={errors.correo}
                  />
                  {!id ? (
                    <p className="text-slate-600 mb-2 mt-2 font-normal text-justify">
                      Por favor, ten en cuenta que una vez que guardes la
                      información, no podrás cambiar la prioridad debido a
                      restricciones del sistema. Asegúrate de seleccionar la
                      opción correcta antes de confirmar.
                    </p>
                  ) : (
                    <p className="text-slate-600 mb-2 mt-2 font-normal text-justify">
                      Actualmente, la edición de la prioridad se encuentra deshabilitada debido
                      a restricciones del sistema. Este impedimento es necesario
                      para garantizar la integridad y consistencia de la información almacenada.
                    </p>
                  )}
                  <SelectField
                    label="Prioridad"
                    labelProp="nombre"
                    name="perfilID"
                    disabled={!!id}
                    options={perfiles.data || []}
                    control={control}
                    error={errors.perfilID}
                  />
                  <SelectField
                    label="Estatus"
                    labelProp="nombre"
                    name="estatus"
                    options={TipoEstatus}
                    control={control}
                  />
                </div>
                <div className="col-span-12 lg:col-span-8 md:col-span-12 sm:col-span-12 space-y-2">
                  <p
                    htmlFor="agregar"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Grupo - Carrera
                  </p>
                  <List
                    sx={{
                      borderRadius: 1,
                      width: '100%',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <ListItem
                      divider
                      secondaryAction={(
                        <Checkbox
                          onChange={handleCheckedTodos}
                          checked={checkedTodos}
                          edge="end"
                        />
                      )}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Seleccionar todos" />
                      </ListItemButton>
                    </ListItem>
                    {carreras.status === 'success' && carreras.data ? (
                      carreras.data.map(
                        (carrera) => carrera.Grupos.length > 0 && (
                        <div key={carrera.id}>
                          <List>
                            {carrera.Grupos.map((grupo) => (
                              <ListItem
                                key={grupo.id}
                                divider
                                secondaryAction={(
                                  <Checkbox
                                    edge="end"
                                    onChange={() => seleccionarGrupo(grupo.id)}
                                    checked={
                                          gruposSeleccionados.indexOf(
                                            grupo.id,
                                          ) !== -1
                                        }
                                  />
                                    )}
                              >
                                <ListItemButton>
                                  <ListItemIcon>
                                    <Groups2Icon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={`${grupo.nombre} - ${carrera.nombre}`}
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </div>
                        ),
                      )
                    ) : (
                      <EmptyRows />
                    )}
                  </List>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
