import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import MuiListItem from '@mui/material/ListItem';
import { Link, useLocation } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';

import Perfil from './profile';
import NavItems from './navItems';

const ListItem = withStyles({ selected: {} })(MuiListItem);

const Drawer = ({
  secciones,
  onLogout,
  container,
  mobileOpen,
  drawerWidth,
  handleDrawerToggle,
}) => {
  const location = useLocation();
  const { pathname } = location;

  const ruteSelected = useCallback((ruta) => (pathname.includes(ruta) ? '#BE8B3C' : '#081B3A'), [pathname]);

  return (
    <MuiDrawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Perfil onLogout={onLogout} />
        <Divider />
        <List>
          <ListItem
            disablePadding
            component={Link}
            to="dashboard"
            sx={{ color: ruteSelected('dashboard') }}
          >
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemIcon sx={{ color: ruteSelected('dashboard') }}><HomeIcon /></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
          {NavItems.map((item) => {
            const seccion = secciones.find((seccionID) => item.seccionID === seccionID);
            if (seccion) {
              return (
                <ListItem
                  key={item.seccionID}
                  disablePadding
                  component={Link}
                  to={item.url}
                  sx={{
                    color: ruteSelected(item.url),
                  }}
                >
                  <ListItemButton sx={{ textAlign: 'start' }}>
                    <ListItemIcon sx={{ color: ruteSelected(item.url) }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </Box>
    </MuiDrawer>
  );
};

Drawer.propTypes = {
  secciones: propTypes.oneOfType([propTypes.array]).isRequired,
  onLogout: propTypes.func.isRequired,
  container: propTypes.element,
  mobileOpen: propTypes.bool.isRequired,
  drawerWidth: propTypes.number.isRequired,
  handleDrawerToggle: propTypes.func.isRequired,
};

Drawer.defaultProps = {
  container: undefined,
};

export default Drawer;
