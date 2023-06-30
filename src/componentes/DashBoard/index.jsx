import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from '../../configuracion/auth';

import AppBar from './appbar';
import Drawer from './drawer';

const drawerWidth = 240;

const DashBoard = ({ window, children }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, user } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/login', {
      replace: true,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        id={id}
        open={open}
        onLogout={onLogout}
        secciones={user?.secciones}
        anchorEl={anchorEl}
        handleOpen={handleDrawerToggle}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      <Box component="nav">
        <Drawer
          secciones={user?.secciones}
          onLogout={onLogout}
          container={container}
          mobileOpen={mobileOpen}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1, paddingRight: 3, width: '100%', height: '100%',
        }}
        className="container"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

DashBoard.propTypes = {
  children: propTypes.node.isRequired,
  window: propTypes.number,
};

DashBoard.defaultProps = {
  window: undefined,
};

export default DashBoard;
