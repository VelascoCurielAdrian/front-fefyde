import React, { useEffect } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';

import Header from '../../componentes/Header';
import Table from '../../componentes/TableBase';
import UploadFile from '../../componentes/UploadFiles';
import SelectField from '../../componentes/Formularios/SelectField';

import useAlumnos from '../../hooks/useAlumnos';

const columns = [
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'apellidoPaterno',
    headerName: 'APELLIDO PATERNO',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'apellidoMaterno',
    headerName: 'APELLIDO MATERNO',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'cuenta',
    headerName: 'CUENTA',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

export const AlumnosMultiples = () => {
  const location = useLocation();
  const { grupo } = location.state;

  const {
    gruposAlumno,
    errors, control, guardar, obtenerArchivos,
    cancelarArchivo, descargarPlantilla, fileExcel, setValue,
  } = useAlumnos();

  useEffect(() => {
    if (grupo) {
      setValue('grupoID', grupo.id);
    }
  }, [grupo, setValue]);

  return (
    <>
      <Header
        name="alumnos"
        title="Catálogo de alumnos"
        subtitle="Módulo para dar de alta múltiples alumnos"
        handleCreate={guardar}
        agregar
      />
      <div className="mt-2 md:col-span-2 md:mt-0 mb-8">
        <form id="AlumnosMultiples">
          <div className="bg-slate-200 overflow-hidden shadow sm:rounded-md">
            <div className="px-4 py-5 sm:p-6 h-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-5 md:col-span-12 sm:col-span-12 space-y-3">
                  <div className="flex">
                    <Typography
                      htmlFor="clasificacion"
                      className="block text-sm mb-1 font-medium text-gray-700"
                    >
                      El archivo Excel deberá tener el siguiente formato:
                    </Typography>
                    <HelpOutlineIcon
                      size={20}
                      className="ml-auto"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {}}
                    />
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                      <SelectField
                        label="Seleccione un grupo"
                        labelProp="nombre"
                        name="grupoID"
                        options={gruposAlumno?.data || []}
                        control={control}
                        error={errors.grupoID}
                      />
                    </div>
                  </div>
                  <UploadFile
                    plantilla
                    type="Excel"
                    getFiles={obtenerArchivos}
                    onCancel={cancelarArchivo}
                    handlePlantilla={descargarPlantilla}
                  />
                </div>
                <div style={{ maxHeight: '70vh' }} className="col-span-12 lg:col-span-7 md:col-span-12 sm:col-span-12 overflow-auto">
                  <Table
                    name="alumnos"
                    title="Alumnos agregados por excel"
                    subtitle="Módulo para consultar alumnos"
                    columns={columns}
                    data={
                      (fileExcel.length > 0
                        && fileExcel.map((el, index) => ({
                          ...el,
                          id: new Date().getTime() + index,
                        })))
                      || []
                    }
                    autoHeight
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
