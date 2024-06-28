/* eslint-disable default-case */
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import Chip from '@mui/material/Chip';
import { enumEstadoActividad } from '../../enums/estadoActividad';

const ContainerChip = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 5,
  minWidth: 40,
}));

const EstadoAvanceAlumno = ({ usuario }) => {
  let estadoAceptado = 0;
  let estadoPendiente = 0;
  let estadoRechazado = 0;
  let promedio = 0;

  usuario.ActividadAlumnos.forEach((actividad) => {
    promedio += parseFloat(actividad.calificacion);
    switch (actividad.estadoActividad) {
      case enumEstadoActividad.ACPETADO:
        estadoAceptado += 1;
        break;
      case enumEstadoActividad.RECHAZADO:
        estadoRechazado += 1;
        break;
      case enumEstadoActividad.PENDIENTE:
        estadoPendiente += 1;
        break;
    }
  });

  promedio = parseFloat(Math.min((promedio * 10) / 35, 10)).toFixed(2);

  return (
    <Box
      display="flex"
      className=" bg-slate-400"
      sx={{
        gap: 1,
        backgroundColor: 'info',
        p: 1,
        borderRadius: 1,
        width: 230,
      }}
    >
      <ContainerChip
        size="small"
        color="success"
        label={estadoAceptado}
      />
      <ContainerChip
        size="small"
        color="info"
        label={estadoPendiente}
      />
      <ContainerChip
        size="small"
        color="error"
        label={estadoRechazado}
      />
      <ContainerChip
        size="small"
        label={promedio}
        sx={{ width: '100%', backgroundColor: '#BE8B3C', color: '#fff' }}
      />
    </Box>
  );
};

const actividadPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  alumnoID: PropTypes.number.isRequired,
  actividadID: PropTypes.number.isRequired,
  archivo: PropTypes.string.isRequired,
  evaluador: PropTypes.string,
  calificacion: PropTypes.string.isRequired,
  estadoActividad: PropTypes.string.isRequired,
  fechaRegistro: PropTypes.string.isRequired,
  usuarioModificacionID: PropTypes.number,
  fechaModificacion: PropTypes.string,
});

EstadoAvanceAlumno.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ActividadAlumnos: PropTypes.arrayOf(actividadPropType).isRequired,
  }).isRequired,
};

export default React.memo(EstadoAvanceAlumno);
