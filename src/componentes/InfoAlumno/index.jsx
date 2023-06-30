import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography, CardMedia, Grid,
} from '@mui/material';

import iconWoman from '../../assets/student_woman.png';
import iconMan from '../../assets/student-man.png';
import { Generos } from '../../helpers/constants';

const InfoAlumno = ({ info }) => (
  <Grid container spacing={2}>
    <Grid item lg={3} md={3} sm={3} xs={0}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ width: 310, margin: 3, borderRadius: 2 }}
        image={Generos.find((el) => el.id === info?.genero)?.nombre === 'Masculino' ? iconMan : iconWoman}
      />
    </Grid>
    <Grid item lg={9} md={9} sm={10}>
      <Grid container sx={{ p: 4 }} gap={0} spacing={3}>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Cuenta
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.cuenta}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Nombre
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.nombre}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Apellido Paterno
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.apellidoPaterno}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Apellido Materno
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.apellidoMaterno}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Edad
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.edad}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Correo Institucional
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.correo}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Fecha de nacimiento
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.fechaNacimiento}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Ciclo escolar
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.fechaNacimiento}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Grupo
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.fechaNacimiento}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Semestre
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {info?.semestre}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" sx={{ fontWeight: 700, fontSize: 12 }}>
            Género
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
            {Generos.find((el) => el.id === info?.genero)?.nombre}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

InfoAlumno.propTypes = {
  info: PropTypes.shape({
    genero: PropTypes.number,
    cuenta: PropTypes.string,
    nombre: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    edad: PropTypes.number,
    correo: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    semestre: PropTypes.number,
  }),
};

InfoAlumno.defaultProps = {
  info: {},
};

export default InfoAlumno;
