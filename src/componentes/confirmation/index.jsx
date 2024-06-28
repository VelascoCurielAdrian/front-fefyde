import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Popover, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelOutlined from '@mui/icons-material/CancelOutlined';

import ButtonCustomized from '../Button';

const Actions = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 10,
  '& button': {
    margin: '0px 2px',
  },
}));

const Copmponent = ({
  open,
  titulo,
  anchorEl,
  handleClose,
  handleDelete,
}) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
    PaperProps={{ style: { ransform: 'translateX(-50px) translateY(-25px)' } }}
  >
    <Typography sx={{ p: 1.5 }}>
      {titulo}
    </Typography>
    <Actions>
      <ButtonCustomized
        size="small"
        variant="outlined"
        label="Cancelar"
        onClick={handleClose}
        icono={<CancelOutlined />}
      />
      <ButtonCustomized
        size="small"
        label="Aceptar"
        onClick={handleDelete}
        icono={<DeleteIcon />}
      />
    </Actions>
  </Popover>
);

Copmponent.propTypes = {
  titulo: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.object]),
};

Copmponent.defaultProps = {
  anchorEl: null,
  titulo: '¿Esta seguro de eliminar el elemento?',
};

export default React.memo(Copmponent);
