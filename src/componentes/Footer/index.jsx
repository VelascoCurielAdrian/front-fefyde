import React from 'react';
import {
  Box, Container,
} from '@mui/material';
import Copyright from '../CopyRight';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      bottom: 0,
      marginTop: '3rem',
      position: 'fixed',
      padding: '1rem',
      width: '100%',
      backgroundColor: (theme) => theme.palette.action.active,
    }}
  >
    <Container maxWidth="md">
      <Copyright color="#ffff" />
    </Container>
  </Box>
);

export default Footer;
