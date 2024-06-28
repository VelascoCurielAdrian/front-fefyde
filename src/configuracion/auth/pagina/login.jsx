import React, { useContext } from 'react';

import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Logo from '../../../componentes/Logo';
import Button from '../../../componentes/Button';
import Copyright from '../../../componentes/CopyRight';
import CheckBox from '../../../componentes/Formularios/CheckBox';
import TextField from '../../../componentes/Formularios/TextField';

import { validacion } from './helper';
import { AuthContext } from '../context';
import { setTokenHeader } from '../../axios';
import { tiposLogoEnum } from '../../../helpers/constants';
import { iniciarSession } from '../../../validaciones/usuarios';

import fondo from './fondo.png';
import paleta from '../../paleta';
import { ERROR } from '../../mensajes';

const input = {
  usuario: '',
  password: '',
  sessionActiva: false,
};
export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validacion),
    defaultValues: input,
  });

  const { mutate } = useMutation(iniciarSession, {
    onSuccess: (response) => {
      login({ ...response, typeSession: watch('sessionActiva') });
      setTokenHeader(response.token);
      navigate('/dashboard', {
        replace: true,
      });
      toast.success(`Bienvenido/a ${response.usuario}`);
      clearErrors('usuario');
      clearErrors('password');
    },
    onError: (error) => {
      if (error.data.type === 'userName') {
        setError('usuario', { type: 'custom', message: error.data.message });
      } else if (error.data.type === 'password') {
        setError('password', { type: 'custom', message: error.data.message });
      } else {
        toast.error(ERROR);
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#ffff' }}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          lg={8}
          md={8}
          sm={6}
          xs={false}
          sx={{
            backgroundImage: `url(${fondo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Logo
              color={paleta.login.main}
              tipoLogo={tiposLogoEnum.SOLO_IMAGEN}
              size={120}
              link
            />
            <Typography component="h1" variant="h5" textAlign="start">
              Inicio de Sesión
            </Typography>
            <Typography
              component="h1"
              variant="p"
              textAlign="start"
              sx={{ color: grey[600] }}
            >
              Identifícate para ingresar a tu cuenta.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <TextField
                autoFocus
                control={control}
                name="usuario"
                error={errors.usuario}
                label="Usuario"
              />
              <TextField
                control={control}
                name="password"
                type="password"
                error={errors.password}
                label="Contraseña"
              />
              <CheckBox
                label="Mantener sesión activa"
                name="sessionActiva"
                control={control}
              />
              <Button label="Iniciar sesión" isSubmit fullWidth />
            </form>
          </Box>
          <Copyright sx={{ mt: 10 }} />
        </Grid>
      </Grid>
    </Box>
  );
};
