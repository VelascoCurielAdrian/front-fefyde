import React, { useLayoutEffect, useState } from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import AppBarMui from '@mui/material/AppBar';
import { useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';

import Logo from '../Logo';
import Perfil from './profile';
import NavItems from './navItems';

import { tiposLogoEnum } from '../../helpers/constants';
import paleta from '../../configuracion/paleta';

const AppBar = ({
  id,
  open,
  secciones,
  onLogout,
  anchorEl,
  handleOpen,
  handleClose,
  handleClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down('md'));
  const [value, setValue] = useState('dashboard');

  const handleChange = (event, newValue) => {
    navigate(newValue);
    setValue(newValue);
  };

  useLayoutEffect(() => {
    const ruta = NavItems.find((seccion) => location.pathname.includes(seccion.url));
    if (ruta) {
      setValue(ruta.url);
    }
  }, [location.pathname]);

  return (
    <AppBarMui component="nav" color="secondary" elevation={0} position="fixed">
      <Toolbar>
        {matches && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleOpen}
          >
            <MenuIcon color="primary" />
          </IconButton>
        )}
        <Box
          component="div"
          sx={{ display: { md: 'block' }, flexGrow: !matches ? 'none' : 1 }}
        >
          <Logo
            color={paleta.primary.main}
            tipoLogo={tiposLogoEnum.IMAGEN_TEXTO}
            size={20}
            link
          />
        </Box>
        {!matches && (
          <Box
            sx={{
              marginRight: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab value="dashboard" label="Inicio" icon={<HomeIcon />} />
              {NavItems.map((item) => {
                const seccion = secciones.find((seccionID) => seccionID === item.seccionID);
                return (
                  seccion && (
                    <Tab
                      key={item.seccionID}
                      value={item.url}
                      label={item.label}
                      icon={item.icon}
                    />
                  )
                );
              })}
            </Tabs>
          </Box>
        )}

        <Box
          sx={{ display: { xs: 'none', sm: 'block', alignItems: 'center' } }}
        >
          <IconButton onClick={handleClick}>
            <AccountBoxIcon color="primary" />
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
};

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
