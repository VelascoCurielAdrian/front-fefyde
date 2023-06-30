import React from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import AppBarMui from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { BiMenu } from 'react-icons/bi';
import { FcPortraitMode, FcHome } from 'react-icons/fc';
import Button from '../Button';
import Perfil from './profile';
import NavItems from './navItems';
import { sizeIcon } from '../../helpers/constants';

const AppBar = ({
  id,
  open,
  secciones,
  onLogout,
  anchorEl,
  handleOpen,
  handleClose,
  handleClick,
}) => (
  <AppBarMui component="nav">
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleOpen}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <BiMenu />
      </IconButton>
      <Box
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
      >
        <Typography
          style={{ fontWeight: '700', fontSize: 12 }}
          className="block text-gray-100"
        >
          SISTEMA DE CRÉDITOS DE LIBRE ELECCIÓN
        </Typography>
      </Box>
      <Box
        sx={{
          display: {
            mr: 1, xs: 'none', sm: 'block', marginLeft: 'auto',
          },
        }}
      >
        <Button
          sx={{ mr: 1, color: '#FFFF' }}
          size="small"
          component={Link}
          url="Inicio"
          label="Inicio"
          icono={<FcHome size={sizeIcon} />}
          variant="text"
        />
        {
          NavItems.map((item) => {
            const seccion = secciones.find((seccionID) => seccionID === item.seccionID);
            if (seccion) {
              return (
                <Button
                  key={item.seccionID}
                  sx={{ mr: 1, color: '#FFFF' }}
                  size="small"
                  component={Link}
                  url={item.url}
                  label={item.label}
                  icono={item.icon}
                  variant="text"
                />
              );
            }
            return null;
          })
        }
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <IconButton onClick={handleClick}>
          <FcPortraitMode size={30} />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Perfil onLogout={onLogout} />
        </Popover>
      </Box>
    </Toolbar>
  </AppBarMui>
);

AppBar.propTypes = {
  id: propTypes.string,
  open: propTypes.bool,
  onLogout: propTypes.func,
  secciones: propTypes.oneOfType([propTypes.array]).isRequired,
  anchorEl: propTypes.oneOfType([propTypes.any]),
  handleOpen: propTypes.func.isRequired,
  handleClose: propTypes.func.isRequired,
  handleClick: propTypes.func.isRequired,
};

AppBar.defaultProps = {
  id: '',
  open: false,
  anchorEl: null,
  onLogout: {},
};

export default AppBar;
