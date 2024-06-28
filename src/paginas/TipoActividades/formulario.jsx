import React, { forwardRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { Grid, Slide } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FiEdit from '@mui/icons-material/Edit';

import TextField from '../../componentes/Formularios/TextField';
import { Validacion } from '../../validaciones/tipoActividades';

import Dialog from '../../componentes/Dialog';
import useFormQuery from '../../hooks/useFormQuery';
import { TIPO_ACTIVIDADES } from '../../configuracion/endpoints';
import Table from '../../componentes/Table';

const Transition = forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const columns = [
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    flex: 1,
    editable: false,
  },
];

export const TipoActividad = ({ handleClose, open }) => {
  const [id, setId] = useState(null);

  const {
    reset, control, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: { nombre: '' }, resolver: yupResolver(Validacion),
  });

  const { accion } = useFormQuery({
    id,
    reset,
    redirect: false,
    endpoint: TIPO_ACTIVIDADES,
  });

  const onSubmit = async (data) => {
    try {
      await accion.mutateAsync(data);
    } catch (e) {
      toast.error(e.data.errorMessage);
    } finally {
      handleClose();
      reset({ nombre: '' });
      setId(null);
    }
  };

  const newColumnas = useMemo(() => [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACCIONES',
      getActions: ({ row }) => [
        <GridActionsCellItem
          onClick={() => setId(row.id)}
          icon={<FiEdit size={15} />}
          label="Editar"
        />,
      ],
    },
  ], []);

  return (
    <Dialog
      open={open}
      title="Agregue un nuevo tipo de actividad"
      TransitionComponent={Transition}
      onClose={() => {
        handleClose();
        reset({ nombre: '' });
      }}
      maxWidth="xs"
      fullWidth
      actions
      actionCancel={() => {
        handleClose();
        reset({ nombre: '' });
      }}
      loading
      actionSave={onSubmit}
      handleSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={12} mb={2}>
          <TextField
            autoFocus
            label="Nombre"
            name="nombre"
            control={control}
            error={errors.nombre}
          />
        </Grid>
        <Grid item xs={12}>
          <Table
            name="tipoActividades"
            uri={TIPO_ACTIVIDADES}
            title="Catálogo de actividades"
            subtitle="Módulo para consultar actividades"
            columns={newColumnas}
            showHeader={false}
            height={200}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};

TipoActividad.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default React.memo(TipoActividad);
