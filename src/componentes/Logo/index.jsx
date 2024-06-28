import React, { useCallback, useMemo } from 'react';
import propTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tiposLogoEnum } from '../../helpers/constants';

const Logo = ({
  size, color, link, tipoLogo,
}) => {
  const navigate = useNavigate();

  const navegarAInicio = useCallback(() => {
    if (link) navigate('/dashboard');
  }, [link, navigate]);

  const tamanio = useMemo(() => {
    const tamanio = {
      [tiposLogoEnum.SOLO_IMAGEN]: size,
      [tiposLogoEnum.SOLO_TEXTO]: size,
      [tiposLogoEnum.IMAGEN_TEXTO]: size * 2,
      [tiposLogoEnum.IMAGEN_SOBRE_TEXTO]: size * 4,
    };
    return tamanio[tipoLogo];
  }, [tipoLogo, size]);

  return (
    <Box
      display="flex"
      flexDirection={tipoLogo === tiposLogoEnum.IMAGEN_SOBRE_TEXTO ? 'column' : 'row'}
      height={tamanio}
      alignItems="center"
      role="button"
      className="mx-auto w-auto"
      onClick={navegarAInicio}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      {
        (
          tipoLogo === tiposLogoEnum.SOLO_IMAGEN
          || tipoLogo === tiposLogoEnum.IMAGEN_TEXTO
          || tipoLogo === tiposLogoEnum.IMAGEN_SOBRE_TEXTO
        ) && (
          <img src="/uas.png" alt="logo" width={tamanio} />
        )
      }
      {
        (
          tipoLogo === tiposLogoEnum.SOLO_TEXTO
          || tipoLogo === tiposLogoEnum.IMAGEN_TEXTO
          || tipoLogo === tiposLogoEnum.IMAGEN_SOBRE_TEXTO
        ) && (
          <Box
            marginTop={
              tipoLogo === tiposLogoEnum.IMAGEN_SOBRE_TEXTO ? -2 : 2
            }
            display="flex"
            alignItems="flex-end"
          >
            <Typography
              gutterBottom
              style={{
                color,
                fontSize: 16,
                marginTop: 'auto',
                fontWeight: 'bold',
              }}
              variant="h4"
            >
              FEFYDE CREDITOS
            </Typography>
          </Box>
        )
      }
    </Box>
  );
};

Logo.propTypes = {
  /** Indica el tamaño del logo */
  size: propTypes.number,
  /** Indica el color del logo */
  color: propTypes.string,
  /** Indica el link al que se redireccionará al hacer click en el logo */
  link: propTypes.bool,
  /** Indica el tipo de logo */
  tipoLogo: propTypes.oneOf(Object.values(tiposLogoEnum)),
};

Logo.defaultProps = {
  size: 100,
  color: '#FFF',
  link: false,
  tipoLogo: tiposLogoEnum.IMAGEN_TEXTO,
};

export default Logo;
