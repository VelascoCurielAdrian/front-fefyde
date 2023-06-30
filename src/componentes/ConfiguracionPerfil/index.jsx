import React, { useContext } from 'react';
import { BsFileEarmarkPdfFill, BsFillArrowDownSquareFill } from 'react-icons/bs';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { MdEmail, MdSecurity } from 'react-icons/md';
import { FcGraduationCap } from 'react-icons/fc';
import { FaGraduationCap } from 'react-icons/fa';
import ListItem from '@mui/material/ListItem';
import { HiUserGroup } from 'react-icons/hi';
import { TfiReload } from 'react-icons/tfi';
import { CgProfile } from 'react-icons/cg';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';

import { AuthContext } from '../../configuracion/auth';

const Component = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-full w-full flex items-center justify-center mb-8">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6 h-full">
          <div className="max-w-full w-full h-full">
            <FcGraduationCap className="mx-auto w-auto" size={80} />
            <h1 className="perfil">{`Bienvenido, ${user.usuario}`}</h1>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="bg-amber-500">
                    <CgProfile size={25} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cuenta" secondary="13567-7" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="bg-amber-500">
                    <FaGraduationCap size={25} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Generación" secondary="2018-2023" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="bg-amber-500">
                    <HiUserGroup size={25} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Grupo" secondary="3 - 4" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="bg-amber-500">
                    <MdEmail size={25} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Correo electrónico" secondary="a.20velasco@info.uas.edu.mx" />
              </ListItem>
              <ListItem secondaryAction={(
                <IconButton size="large">
                  <TfiReload />
                </IconButton>
              )}
              >
                <ListItemAvatar>
                  <Avatar className="bg-amber-500">
                    <MdSecurity size={25} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Contraseña" secondary="Actualizar credenciales" />
              </ListItem>
              <ListItem secondaryAction={(
                <IconButton size="large">
                  <BsFillArrowDownSquareFill />
                </IconButton>
              )}
              >
                <ListItemAvatar>
                  <Avatar className="bg-amber-500">
                    <BsFileEarmarkPdfFill size={25} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Bitácora" secondary="Detalles de actividad" />
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Component);
