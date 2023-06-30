import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import { BiLogIn } from 'react-icons/bi';
import { FcSettings, FcBusinessman, FcGraduationCap } from 'react-icons/fc';
import { PermisosUsuario } from '../../helpers';

const Perfil = ({ onLogout }) => {
  const { esAdministrador, usuario } = PermisosUsuario();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {esAdministrador ? (
              <FcBusinessman size={26} />
            ) : (
              <FcGraduationCap size={26} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={usuario}
            secondary={esAdministrador ? 'Administrador' : 'Estudiante'}
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
            <FcSettings size={26} />
          </ListItemIcon>
          <ListItemText
            primary="Configuración"
            secondary="Información personal"
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={onLogout}>
          <ListItemIcon>
            <BiLogIn size={26} />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sessión" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

Perfil.propTypes = {
  onLogout: propTypes.func.isRequired,
};

export default Perfil;
