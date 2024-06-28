import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import SettingsIcon from '@mui/icons-material/Settings';

import { AuthContext } from '../../configuracion/auth';

const Perfil = ({ onLogout }) => {
  const { user } = useContext(AuthContext);

  return (
    <List>
      <ListItem disablePadding color="primary">
        <ListItemButton>
          <ListItemIcon color="primary">
            <AdminPanelSettingsIcon size={26} color="primary" />
          </ListItemIcon>
          <ListItemText
            color="primary"
            primary="Perfíl"
            secondary={user.perfil}
          />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        component={Link}
        to="configuracion"
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon size={26} color="primary" />
          </ListItemIcon>
          <ListItemText
            color="primary"
            primary="Configuración"
            secondary="Información personal"
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={onLogout}>
          <ListItemIcon>
            <NoAccountsIcon size={26} color="primary" />
          </ListItemIcon>
          <ListItemText color="primary" primary="Cerrar Sessión" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

Perfil.propTypes = {
  onLogout: propTypes.func.isRequired,
};

export default Perfil;
