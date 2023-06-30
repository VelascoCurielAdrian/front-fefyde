/* eslint-disable import/prefer-default-export */
import React from 'react';
import Card from '@mui/material/Card';
import {
  FcBusinessman, FcBusinesswoman, FcConferenceCall, FcGraduationCap,
} from 'react-icons/fc';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Header from '../../componentes/Header';

export const Perfil = () => {
  const [checked, setChecked] = React.useState([0]);
  return (
    <>
      <Header
        title="Perfiles"
        subtitle="Modulo para gestionar perfiles."
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
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 m-3">
                    <Card>
                      <CardActionArea onClick={() => console.log('hola')}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                          <FcBusinessman size={180} />
                          <FcBusinesswoman size={180} />
                        </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Jefes / Jefas de carrera
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Apartado donde se asignará a un grupo de alumnos
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                  <div className="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 m-3">
                    <Card>
                      <CardActionArea onClick={() => console.log('hola')}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                          <FcGraduationCap size={180} />
                        </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Carreras
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Apartado donde se asignará a un grupo de alumnos
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                  <div className="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12 sm:col-span-12 m-3">
                    <Card>
                      <CardActionArea onClick={() => console.log('hola')}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                          <FcConferenceCall size={180} />
                        </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Asignación de grupos
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Apartado donde se asignará a un grupo de alumnos
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
};
