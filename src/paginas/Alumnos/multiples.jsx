/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { useMutation, useQueries } from '@tanstack/react-query';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { FcInfo } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { MdDescription } from 'react-icons/md';

import { TabContainer, TabsHeader } from '../../componentes/TabControl';
import { SelectFieldController } from '../../componentes/Formulario';
import Dialog from '../../componentes/Dialog';
import axios from '../../configuracion/axios';
import Header from '../../componentes/Header';
import Table from '../../componentes/TableBase';
import UploadFile from '../../componentes/UploadFiles';
import InfoAlumno from '../../componentes/InfoAlumno';

import {
  encontrarElementoRepetido,
  exportExcel,
  generatePassword,
} from '../../helpers';

import { Generos, tabs, tabData } from '../../helpers/constants';
import endpoints from '../../configuracion/endpoints';
import formatAlumos from '../../assets/formatAlumos.png';
import {
  ERROR,
  ERROR_EXCEL,
  ERROR_EXCEL_CUENTA_REPETIDA,
} from '../../configuracion/mensajes';

const customActions = {
  multiples: (body) => axios.post(endpoints.alumnos.multiples(), body),
  getCiclos: () => axios.get(endpoints.cicloEscolar.base()),
  getGrupos: () => axios.get(endpoints.grupos.base()),
  getCarreras: () => axios.get(endpoints.carrera.base()),
};

export const AlumnosMultiples = () => {
  const navigate = useNavigate();
  const [fileExcel, setFileExcel] = useState([]);
  const [openModal, setOpenModal] = useState({
    state: false,
    key: '',
    title: '',
    info: {},
  });
  const [tabValue, setTabValue] = useState(0);
  const [isDetail, setIsDetail] = useState(false);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { carreraID: '' },
  });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabContentStyle = {
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  };

  const [cicloEscolar, gruposAlumno, carrera] = useQueries({
    queries: [
      {
        queryKey: ['cicloEscolar'],
        queryFn: () => customActions.getCiclos(),
      },
      {
        queryKey: ['grupos'],
        queryFn: () => customActions.getGrupos(),
      },
      {
        queryKey: ['carreras'],
        queryFn: () => customActions.getCarreras(),
      },
    ],
  });

  const handleOpenInfo = ({ key, info, title }) => {
    setOpenModal({
      state: true,
      title,
      info,
      key,
    });
    setIsDetail(false);
  };

  const columns = [
    {
      field: 'Nombre',
      headerName: 'NOMBRE COMPLETO',
      width: 220,
      valueGetter: ({ row }) => `${row?.nombre} ${row?.apellidoPaterno} ${row?.apellidoMaterno}`,
      editable: false,
    },
    {
      field: 'cicloEscolar',
      headerName: 'CICLO',
      width: 150,
      editable: false,
    },
    {
      field: 'grupo',
      headerName: 'GRUPO',
      width: 150,
      editable: false,
    },
    {
      field: 'semestre',
      headerName: 'SEMESTRE',
      width: 95,
      editable: false,
    },
    {
      field: 'custmoActions',
      type: 'actions',
      headerName: 'INFORMACIÓN',
      width: 130,
      getActions: ({ row }) => [
        <GridActionsCellItem
          onClick={() => handleOpenInfo({
            key: 'credenciales',
            info: row,
            title: 'Información del alumno',
          })}
          icon={<FcInfo size={20} />}
          label="Editar"
        />,
      ],
    },
  ];

  const acciones = useMutation({
    mutationFn: customActions.multiples,
    onSuccess: (result) => {
      toast.success(result.mensaje);
      navigate('/alumnos', {
        replace: true,
      });
    },
  });

  const onSubmit = async () => {
    try {
      if (fileExcel.length === 0) {
        return toast.warning('Debe al menos agregar un alumno');
      }
      return await acciones.mutateAsync({ alumnos: fileExcel });
    } catch (error) {
      return toast.warning(error?.data || ERROR);
    }
  };

  const getFiles = (files) => {
    let erroresCiclo = 0;
    let erroresGrupos = 0;
    let erroresGeneros = 0;

    const cuentaRepetida = encontrarElementoRepetido(
      files.map(({ cuenta }) => cuenta),
    );
    if (cuentaRepetida) {
      toast.warning(ERROR_EXCEL_CUENTA_REPETIDA);
      return;
    }
    const nuevaData = files.map((user) => {
      const ciclo = cicloEscolar.data.find(
        (ciclo) => ciclo.clave === user.ciclo,
      );
      const genero = Generos.find((genero) => genero.clave === user.genero);
      const grupo = gruposAlumno.data.find((gpo) => gpo.id === user.grupo);

      if (!ciclo) {
        erroresCiclo += 1;
      }
      if (!genero) {
        erroresGeneros += 1;
      }
      if (!grupo) {
        erroresGrupos += 1;
      }

      return {
        ...user,
        cuenta: user.cuenta.toString(),
        password: generatePassword(),
        userName: user.cuenta.toString(),
        cicloEscolar: ciclo?.nombre,
        cicloID: ciclo?.id,
        genero: genero?.id,
        grupoID: grupo?.id,
        grupo: grupo?.nombre,
      };
    });

    if (erroresCiclo > 0 || erroresGeneros > 0 || erroresGrupos > 0) {
      toast.error(ERROR_EXCEL);
      return;
    }

    setFileExcel(nuevaData);
  };

  const onCancel = () => {
    setFileExcel([]);
  };

  const handleCloseInfo = () => {
    setOpenModal({ state: false, key: '' });
  };

  const handlePlantilla = () => {
    const data = [
      {
        cuenta: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        fechaNacimiento: '',
        ciclo: '',
        semestre: '',
        grupo: '',
        edad: '',
        genero: '',
      },
    ];
    exportExcel(data, 'Plantilla Alumnos');
  };

  return (
    <>
      <Header
        name="alumnos"
        title="Catálogo de alumnos"
        subtitle="Módulo para dar de alta multiples alumnos"
        handleCreate={onSubmit}
        agregar
      />
      <>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-2">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0 mb-8">
          <form id="AlumnosMultiples">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 h-full">
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
                    <div className="flex">
                      <Typography
                        htmlFor="clasificacion"
                        className="block text-sm mb-1 font-medium text-gray-700"
                      >
                        El archivo Excel deberá tener el siguiente formato:
                      </Typography>
                      <FcInfo
                        size={20}
                        className="ml-auto"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenInfo({
                          key: 'info',
                          title: 'Formato del archivo',
                        })}
                      />
                    </div>
                    <SelectFieldController
                      label="Seleccione una Carrera"
                      labelProp="nombre"
                      name="carreraID"
                      options={carrera?.data || []}
                      control={control}
                      error={errors.carreraID}
                    />
                    <UploadFile
                      plantilla
                      type="Excel"
                      getFiles={getFiles}
                      onCancel={onCancel}
                      handlePlantilla={handlePlantilla}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-3">
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
                      height={306}
                      showHeader={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
      <Dialog
        open={openModal.state}
        maxWidth="md"
        title={openModal.title || ''}
        onClose={handleCloseInfo}
      >
        {openModal.key === 'info' && (
          <>
            <Typography
              htmlFor="clasificacion"
              className="block text-sm mb-1 font-medium text-gray-700"
            >
              El archivo Excel deberá tener el siguiente formato:
            </Typography>
            <img src={formatAlumos} className="mx-auto w-auto" alt="alumnos" />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Button
                onClick={() => {
                  setIsDetail(!isDetail);
                }}
                startIcon={<MdDescription />}
              >
                Ver Descripción
              </Button>
            </div>
            {isDetail && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.2,
                }}
              >
                <div>
                  <TabsHeader
                    value={tabValue}
                    handleChange={handleChangeTab}
                    tabs={tabs}
                  />
                </div>
                <div style={tabContentStyle}>
                  {tabData.map((tab) => (
                    <TabContainer
                      key={tab.index}
                      value={tabValue}
                      index={tab.index}
                    >
                      {tab.content}
                    </TabContainer>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
        {openModal.key === 'credenciales' && (
          <InfoAlumno info={openModal.info} />
        )}
      </Dialog>
    </>
  );
};
