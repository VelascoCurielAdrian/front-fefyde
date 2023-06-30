import React, { forwardRef, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Button from '../../componentes/Button';
import { TextFieldController } from '../../componentes/Formulario';
import { Validacion } from '../../validaciones/tipoActividades';

import Listado from './listado';
import useFormQuery from '../../hooks/useFormQuery';
import { TIPO_ACTIVIDADES } from '../../configuracion/endpoints';

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

export const TipoActividad = ({ handleClose, open }) => {
  const [id, setId] = useState(null);

  const {
    reset, control, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: { nombre: '' }, resolver: yupResolver(Validacion),
  });

  const { accion } = useFormQuery({
    id, reset, redirect: false, endpoint: TIPO_ACTIVIDADES,
  });

  const onSubmit = async (data) => {
    try {
      await accion.mutateAsync({ ...data, id });
    } catch (e) {
      toast.error(e.data.errorMessage);
    } finally {
      handleClose();
      reset({ nombre: '' });
      setId(null);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ maxHeight: 590 }}
    >
      <DialogTitle>Agregue un nuevo tipo de actividad</DialogTitle>
      <DialogContent>
        <div className="col-span-6 sm:col-span-2 mb-2">
          <TextFieldController
            autoFocus
            label="Nombre"
            name="nombre"
            control={control}
            error={errors.nombre}
          />
        </div>
        <br />
        <div className="col-span-6 sm:col-span-2">
          <Listado getId={(value) => setId(value)} />
        </div>
      </DialogContent>
      <DialogActions sx={{ marginRight: 2 }}>
        <Button
          onClick={() => { handleClose(); reset({ nombre: '' }); }}
          label="Cancelar"
          fullWidth
          icono={<GiCancel size={16} />}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          label="Guardar"
          fullWidth
          icono={<FiSave size={16} />}
        />
      </DialogActions>
    </Dialog>
  );
};

TipoActividad.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default React.memo(TipoActividad);
