import React, { useCallback, useContext, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordIcon from '@mui/icons-material/Password';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Grid, InputAdornment, IconButton,
} from '@mui/material';
import { toast } from 'react-toastify';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Button from '../Button';

import { AuthContext } from '../../configuracion/auth';
import Dialog from '../Dialog';
import TextField from '../Formularios/TextField';
import endpoints, { USUARIOS } from '../../configuracion/endpoints';
import axios from '../../configuracion/axios';
import {
  ERROR,
  PASSWORD_REQUERIDO,
  PASSWORD_NO_CONCIDEN,
  SUCCESS_DATA,
} from '../../configuracion/mensajes';

const Component = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      yup.object({
        passwordActually: yup.string().required(PASSWORD_REQUERIDO),
        newPassword: yup.string().required(PASSWORD_REQUERIDO),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('newPassword'), null], PASSWORD_NO_CONCIDEN)
          .required(PASSWORD_REQUERIDO),
      }),
    ),
  });

  const actulizarCredenciales = useMutation({
    mutationFn: (body) => {
      const url = endpoints.base.url(`${USUARIOS}/actualizarCredenciales`);
      return axios.put(url, body);
    },
    onSuccess: () => {
      setOpenModal(false);
      reset();
      toast.success(SUCCESS_DATA);
      queryClient.invalidateQueries(USUARIOS);
    },
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const onsubmit = useCallback(
    async (values) => {
      try {
        await actulizarCredenciales.mutateAsync(values);
      } catch (error) {
        toast.error(error?.data || ERROR);
      }
    },
    [actulizarCredenciales],
  );

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="h-full w-full flex items-center justify-center mb-8 p-4">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-2 sm:p-6 h-full">
          <div className="max-w-full w-full h-full">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                información del usuario
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Datos personales.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nombre
                  </dt>
                  <dd className="max-w-xs wmt-1 text-center text-sm leading-6 bg-slate-500 text-gray-100 sm:col-span-2 sm:mt-0 p-1 rounded-xl">
                    {user.usuario}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Perfil
                  </dt>
                  <dd className="max-w-xs wmt-1 text-center text-sm leading-6 bg-slate-500 text-gray-100 sm:col-span-2 sm:mt-0 p-1 rounded-xl">
                    {user.perfil}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </dt>
                  <dd className="max-w-xs wmt-1 text-center text-sm leading-6  text-gray-100 sm:col-span-2 sm:mt-0 p-1 rounded-md">
                    <Button
                      fullWidth
                      size="medium"
                      variant="contained"
                      onClick={handleOpenModal}
                      icono={<PasswordIcon size={18} />}
                      label="Actualizar"
                    />
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Acerca de nosotros
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-justify text-gray-700 sm:col-span-2 sm:mt-0">
                    Este valioso sistema, generosamente donado por los dedicados
                    alumnos
                    {' '}
                    <strong>Adrian Velasco Curiel</strong>
                    ,
                    {' '}
                    <strong>Angel Yair Ayón Verdugo</strong>
                    {' '}
                    y
                    {' '}
                    <strong>Osiel Rocha Armenta</strong>
                    , se destaca por su
                    función esencial: facilitar la incorporación del valor
                    crediticio de las actividades de libre elección en el
                    certificado de estudios. Gracias a la generosidad y visión
                    de estos estudiantes, nuestra institución cuenta con una
                    herramienta eficiente y moderna que beneficia a toda la
                    comunidad educativa. Su contribución no solo simplifica el
                    proceso administrativo, sino que también fortalece la
                    experiencia académica, promoviendo la transparencia y el
                    reconocimiento de las actividades extracurriculares. En
                    resumen, este sistema, fruto del compromiso y altruismo de
                    {' '}
                    <strong>Adrian Velasco Curiel</strong>
                    ,
                    {' '}
                    <strong>Angel Yair Ayón Verdugo</strong>
                    {' '}
                    y
                    {' '}
                    <strong>Osiel Rocha Armenta</strong>
                    , representa un avance
                    significativo para la gestión académica, brindando una
                    solución valiosa para el seguimiento y registro de las
                    actividades formativas fuera del plan de estudios
                    convencional.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openModal}
        maxWidth="xs"
        title="Actualiza tu contraseña"
        actions
        loading={actulizarCredenciales.isLoading}
        actionSave={onsubmit}
        handleSubmit={handleSubmit}
        onClose={handleCloseModal}
        actionCancel={handleCloseModal}
        labelButtonSave="Actualizar"
      >
        <Grid container spacing={1} mb={4}>
          <Grid item xs={12}>
            <Box mb={1}>
              <TextField
                autoFocus
                label="Contraseña anterior"
                name="passwordActually"
                control={control}
                type="password"
                error={errors.passwordActually}
              />
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={12} xs={12}>
            <Box mb={1}>
              <TextField
                label="Nueva contraseña"
                name="newPassword"
                control={control}
                error={errors.newPassword}
                type={showPassword ? 'text' : 'password'}
              />
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={12} xs={12}>
            <Box mb={1}>
              <TextField
                label="Confirmar contraseña"
                name="confirmPassword"
                control={control}
                type={showPassword ? 'text' : 'password'}
                error={errors.confirmPassword}
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
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default React.memo(Component);
