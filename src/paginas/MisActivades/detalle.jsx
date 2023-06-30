import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { BsFilePdf } from 'react-icons/bs';
import { FcOk, FcHighPriority, FcClock } from 'react-icons/fc';
import { IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../../componentes/Header';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return {
    desc, qty, unit, price,
  };
}

function subtotal() {
  return 22;
}

const rows = [
  createRow('Diplomado de Especialización', 10, 1.15),
  createRow('Participación en Proyectos de Investigación', 10, 45.99),
  createRow('Asistencia a Eventos Académicos (Congreso, Simposium, Foro, Otros).', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Puntos</TableCell>
                  <TableCell align="right">Comentarios</TableCell>
                  <TableCell align="right">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">Todo ok</TableCell>
                    <TableCell align="right">
                      <Tooltip
                        title="Archivo"
                        placement="left"
                        arrow
                        onClick={() => {}}
                      >
                        <IconButton>
                          <BsFilePdf size={20} className="text-red-600" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Calificación</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DetalleAlumno = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header
        name="actividades"
        title="Detalle de las actividades"
        subtitle="Módulo para visualizar el estatus de las actividades"
      />
      <>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-2">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0 mb-8">
          <form id="herramientas">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 h-full">
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                      indicatorColor="primary"
                    >
                      <Tab icon={<FcOk size={30} />} label="ACTIVIDADES VALIDADAS" {...a11yProps(0)} />
                      <Tab icon={<FcHighPriority size={30} />} label="ACTIVIDADES RECHAZADAS" {...a11yProps(1)} />
                      <Tab icon={<FcClock size={30} />} label="ACTIVIDADES PENDIENTES" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    VALIDADAS
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    RECHAZADAS
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    PENDIENTES
                  </TabPanel>
                </Box>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default DetalleAlumno;
