/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Avatar } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { BsFilePdf } from 'react-icons/bs';
import Dialog from '../../componentes/Dialog';
import InfoAlumno from '../../componentes/InfoAlumno';
import { AlumnosActions } from '../../validaciones/alumnos';
import Button from '../../componentes/Button';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 1,
            overflow: 'auto',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  children: undefined,
};

function VerticalTabs({ info }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <Tabs variant="scrollable" value={value} onChange={handleChange}>
        <Tab label="Información" />
        <Tab label="Archivos" />
        <Tab label="Bitacora" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <InfoAlumno info={info} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
          <ListItem
            secondaryAction={(
              <Button
                size="medium"
                fullWidth
                variant="contained"
                onClick={() => {}}
                icono={<BsFilePdf size={16} />}
                label="Validar"
              />
            )}
          >
            <ListItemAvatar>
              <Avatar>
                <BsFilePdf style={{ color: 'red' }} size={20} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Certificacón de Software de Ofimática" secondary="Subido el Martes, 5 junio 2023" />
          </ListItem>
          <ListItem
            secondaryAction={(
              <Button
                size="medium"
                fullWidth
                variant="contained"
                onClick={() => {}}
                icono={<BsFilePdf size={16} />}
                label="Validar"
              />
            )}
          >
            <ListItemAvatar>
              <Avatar>
                <BsFilePdf style={{ color: 'red' }} size={20} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Certificación Internacional de Competencia Técnica" secondary="Subido el Martes, 5 junio 2023" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BsFilePdf style={{ color: 'red' }} size={20} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Organización de Eventos Académicos, Culturales y/o Deportivo" secondary="Subido el Martes, 5 junio 2023" />
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Bitacora
      </TabPanel>
    </Box>
  );
}

VerticalTabs.propTypes = {
  info: PropTypes.shape({
    genero: PropTypes.number,
    cuenta: PropTypes.string,
    nombre: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    edad: PropTypes.number,
    correo: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    semestre: PropTypes.number,
  }),
};

VerticalTabs.defaultProps = {
  info: {},
};

const DetalleAlumno = ({ id, open, onClose }) => {
  const infoAlumno = useQuery({
    queryKey: ['alumnoByID'],
    queryFn: () => AlumnosActions.GET_BYID(id),
    retry: 3,
    enabled: false,
  });

  useEffect(() => {
    if (id) {
      infoAlumno.refetch();
    }
  }, [id]);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={onClose}
      title="Información del alumno"
      subtitle="Documentos expedidos y validados por un organismo nacional o internacional certificador."
    >
      <VerticalTabs info={infoAlumno.status === 'success' && infoAlumno.data} />
    </Dialog>
  );
};

DetalleAlumno.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

DetalleAlumno.defaultProps = {
  id: undefined,
};

export default DetalleAlumno;
