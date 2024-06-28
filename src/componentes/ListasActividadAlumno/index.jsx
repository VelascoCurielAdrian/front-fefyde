import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Avatar,
  ListItemText,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CloudDoneOutlined } from '@mui/icons-material';
import Button from '../Button';
import { AuthContext } from '../../configuracion/auth';
import UploadFile from '../UploadFiles';

const ListaBicatora = ({ info }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="md:col-span-2 md:mt-0 mb-8">
      <div className="bg-slate-200 overflow-hidden rounded-2xl">
        <div className="px-4 py-5 h-100">
          <div className="col-span-12">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <Card sx={{ height: 400, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={[
                        {
                          name: 'Actividades',
                          Aceptadas: info?.Aceptado,
                          Rechazadas: info?.Rechazado,
                          Pendientes: info?.Pendiente,
                        },
                      ]}
                      margin={{
                        top: 20,
                        right: 5,
                        left: 5,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                      />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="Aceptadas" fill="#00695f" />
                      <Bar yAxisId="right" dataKey="Rechazadas" fill="#ab003c" />
                      <Bar yAxisId="right" dataKey="Pendientes" fill="#1769aa" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Card sx={{ height: 400, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={[
                        {
                          name: 'Creditos',
                          Obligatorios: info?.Obligatorios,
                          Acumulados: info?.Acumulados,
                          Faltantes: info?.Faltante,
                        },
                      ]}
                      margin={{
                        top: 20,
                        right: 5,
                        left: 5,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                      />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="Obligatorios" fill="#00695f" />
                      <Bar yAxisId="right" dataKey="Faltantes" fill="#ab003c" />
                      <Bar yAxisId="right" dataKey="Acumulados" fill="#1769aa" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Card
                  sx={{
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <p className="font-semibold text-base mb-1 text-slate-700">
                      Calificación
                    </p>
                    <List className="overflow-hidden bg-slate-300 sm:rounded-md">
                      <ListItem>
                        <Avatar className="bg-slate-100">
                          <CheckBoxIcon
                            color={
                              info?.Estatus === 'Acreditado' ? 'success' : 'error'
                            }
                          />
                        </Avatar>
                        <ListItemText
                          primary={(
                            <div
                              data-te-chip-init
                              data-te-ripple-init
                              className="[word-wrap: break-word] my-[5px] mr-2 m-2 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50 bg-sky-700"
                              data-te-close="true"
                            >
                              {info?.Promedio}
                              <p>{info?.Estatus}</p>
                            </div>
                          )}
                        />
                      </ListItem>
                    </List>
                    {
                      !user.esAdministrador ? (
                        <>
                          <p className="text-slate-500 mb-2 mt-2">
                            Este botón estará disponible una vez que usted se encuentre
                            debidamente acreditado y haya completado todas las
                            actividades correspondientes.
                          </p>
                          <Button
                            disabled
                            size="medium"
                            variant="contained"
                            onClick={() => {}}
                            icono={<CloudDoneOutlined size={18} />}
                            label="Descargar constancia"
                          />
                        </>
                      ) : (
                        <UploadFile
                          getFiles={() => {}}
                          onCancel={() => {}}
                        />
                      )
                    }
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

ListaBicatora.propTypes = {
  info: PropTypes.shape({
    Aceptado: PropTypes.number,
    Pendiente: PropTypes.number,
    Rechazado: PropTypes.number,
    Acumulados: PropTypes.number,
    Obligatorios: PropTypes.number,
    Faltante: PropTypes.string,
    Promedio: PropTypes.string,
    Estatus: PropTypes.string,
    calificacionAprobatoria: PropTypes.number,
  }),
};

ListaBicatora.defaultProps = {
  info: {},
};

export default ListaBicatora;
