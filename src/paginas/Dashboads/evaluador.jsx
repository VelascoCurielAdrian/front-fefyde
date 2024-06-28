import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {
  Avatar, Box, List, ListItem, ListItemText, Stack, Typography,
} from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const Dashboard = () => (
  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-12">
    <div className="px-4 sm:px-0 mb-4">
      <h1 className="text-lg font-medium leading-7 text-gray-900">
        Información de los grupos asociados para el perfil del evaluador.
      </h1>
      <Typography color="text.secondary" variant="body2" className="text-md text-gray-600">
        Este segmento aún está en proceso de desarrollo, y
        continuamos esforzándonos para proporcionar una experiencia mejorada.
      </Typography>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <div
        className="rounded-lg border border-stroke bg-white py-7 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <h3 className="text-md leading-7 text-gray-900">
              Estado de Actividades
            </h3>
          </Stack>
          <Typography color="text.secondary" variant="body2" className="text-md text-gray-600">
            Resumen integral de las actividades presentadas por los alumnos de los grupos asociados,
            ofreciendo una visión general del progreso y la participación.
          </Typography>
        </Box>

        <List className="overflow-hidden">
          <ListItem>
            <Avatar className="bg-slate-100">
              <CheckCircleOutlineIcon
                color="success"
              />
            </Avatar>
            <ListItemText
              primary={(
                <div
                  data-te-chip-init
                  data-te-ripple-init
                  className="[word-wrap: break-word] my-[5px] mr-2 m-2 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50"
                  data-te-close="true"
                  style={{ backgroundColor: '#00695f' }}
                >
                  Aceptados
                  <p>49</p>
                </div>
              )}
            />
          </ListItem>
          <ListItem>
            <Avatar className="bg-slate-100">
              <ErrorIcon
                color="error"
              />
            </Avatar>
            <ListItemText
              primary={(
                <div
                  data-te-chip-init
                  data-te-ripple-init
                  className="[word-wrap: break-word] my-[5px] mr-2 m-2 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50"
                  data-te-close="true"
                  style={{ backgroundColor: '#ab003c' }}
                >
                  Rechazados
                  <p>49</p>
                </div>
              )}
            />
          </ListItem>
          <ListItem>
            <Avatar className="bg-slate-100">
              <NewReleasesIcon
                color="info"
              />
            </Avatar>
            <ListItemText
              primary={(
                <div
                  data-te-chip-init
                  data-te-ripple-init
                  className="[word-wrap: break-word] my-[5px] mr-2 m-2 flex h-[32px] max-w-xl items-center justify-between rounded-[16px] px-[12px] py-0  text-slate-50"
                  data-te-close="true"
                  style={{ backgroundColor: '#1769aa' }}
                >
                  Pendientes
                  <p>49</p>
                </div>
              )}
            />
          </ListItem>
        </List>
      </div>
      <div
        className="rounded-lg border border-stroke bg-white py-7 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <h3 className="text-md leading-7 text-gray-900">
              Alumnos destacados - promedio
            </h3>
          </Stack>
        </Box>
        <List sx={{
          width: '100%',
          p: 2,
          height: 400,
          overflow: 'auto',
        }}
        >
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
          <ListItem
            divider
            secondaryAction={(
              <h1 className="text-lg font-medium leading-7 text-gray-900">
                9.20
              </h1>
            )}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#00695f' }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adrian Velasco Curiel" secondary="Grupo: 5-4" />
          </ListItem>
        </List>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
          <div
            className="rounded-lg border border-stroke bg-white py-7 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <Box sx={{ p: 3 }}>
              <Stack direction="column" justifyContent="center" alignItems="center">
                <h3 className="text-2xl font-semibold leading-7 text-gray-900 mb-3">
                  40
                </h3>
                <h3 className="text-md leading-7" style={{ color: '#00695f' }}>
                  Alumnos aprobados
                </h3>
              </Stack>
            </Box>
          </div>
          <div
            className="rounded-lg border border-stroke bg-white py-7 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <Box sx={{ p: 3 }}>
              <Stack direction="column" justifyContent="center" alignItems="center">
                <h3 className="text-2xl font-semibold leading-7 text-gray-900 mb-3">
                  32
                </h3>
                <h3 className="text-md leading-7" style={{ color: '#ab003c' }}>
                  Alumnos reprobados
                </h3>
              </Stack>
            </Box>
          </div>
        </div>
        <div
          className="rounded-lg border border-stroke mt-4 bg-white py-7 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <Box sx={{ p: 3 }}>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <h3 className="text-2xl font-semibold leading-7 text-gray-900 mb-3">
                132
              </h3>
              <h3 className="text-md leading-7" style={{ color: '#1769aa' }}>
                Alumnos pendientes por revisar
              </h3>
            </Stack>
          </Box>
        </div>
        <div
          className="rounded-lg border border-stroke mt-4 bg-white py-7 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <Box sx={{ p: 3 }}>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <h3 className="text-2xl font-semibold leading-7 text-gray-900 mb-3">
                132
              </h3>
              <h3 className="text-md leading-7" style={{ color: '#1769aa' }}>
                Total de alumnos
              </h3>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
