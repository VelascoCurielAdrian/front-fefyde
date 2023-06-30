import React from 'react';
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
import { FcHome } from 'react-icons/fc';

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
  return (
    <MuiDrawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Perfil onLogout={onLogout} />
        <Divider />
        <List>
          <ListItem
            disablePadding
            component={Link}
            to="incio"
          >
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemIcon><FcHome size={22} /></ListItemIcon>
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
                  selected={item.url === location.pathname}
                >
                  <ListItemButton sx={{ textAlign: 'start' }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
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
