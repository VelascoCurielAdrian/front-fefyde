/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import {
  Box,
  Grid,
  Link,
  AppBar,
  Toolbar,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FcGraduationCap } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../componentes/Button';
import Copyright from '../../../componentes/CopyRight';
import { validacion } from './helper';
import { AuthContext } from '../context';
import { iniciarSession } from '../../../validaciones/usuarios';
import { TextFieldController } from '../../../componentes/Formulario';
import { setTokenHeader } from '../../axios';
import Loading from '../../../componentes/Loading';

const input = {
  usuario: '',
  password: '',
};
export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(iniciarSession, {
    onSuccess: (response) => {
      login(response);
      setTokenHeader(response.token);
      navigate('/inicio', {
        replace: true,
      });
      toast.success(`Bienvenido ${response.usuario}`);
    },
    onError: (e) => toast.error(e.data.errorMessage),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacion),
    defaultValues: input,
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1, backgroundColor: '#ffff' }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography className="block text-sm font-medium text-gray-100">
              SISTEMA DE CRÉDITOS DE LIBRE ELECCIÓN
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="h-full w-full flex items-center justify-center py-3 px-6 sm:px-6 lg:px-8">
          <Box className="max-w-md w-full h-full">
            <FcGraduationCap className="mx-auto w-auto" size={100} />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <TextFieldController
                autoFocus
                control={control}
                name="usuario"
                error={errors.usuario}
                label="Usuario"
              />
              <TextFieldController
                control={control}
                name="password"
                type="password"
                error={errors.password}
                label="Contraseña"
              />
              <FormControlLabel
                className="text-gray-500 dark:text-gray-400"
                control={<Checkbox onChange={() => {}} />}
                label="Recordar credenciales"
              />
              <Button label="Iniciar Sessión" isSubmit fullWidth />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {' '}
                    ¿Se te olvidó tu contraseña?
                    {' '}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {' '}
                    ¿No tienes una cuenta? inscríbete
                    {' '}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Copyright
              sx={{ mt: 8, mb: 4 }}
            />
          </Box>
        </div>
      </Box>
      <Loading loading={isLoading} />
    </>
  );
};
