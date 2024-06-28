import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import DialogMui from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DialogTitleMui from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
  DialogActions, LinearProgress,
  useMediaQuery, useTheme,
} from '@mui/material';

import Button from '../Button';

const DialogCustom = styled(DialogMui)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitleMui sx={{ m: 1, p: 2 }} {...other}>
      <label
        htmlFor="detalleGastos"
        className="block text-sm mb-2 w-6 font-bold text-primary"
      >
        {children}
      </label>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute', right: 8, top: 16,
          }}
          color="primary"
        >
          <CancelPresentationIcon fontSize="large" />
        </IconButton>
      ) : null}
    </DialogTitleMui>
  );
};

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Dialog = ({
  onClose,
  open,
  title,
  loading,
  subtitle,
  children,
  actions,
  maxWidth,
  actionSave,
  actionCancel,
  handleSubmit,
  labelButtonSave,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <DialogCustom
      fullWidth
      maxWidth={maxWidth}
      sx={{ height: 'auto' }}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {loading && (<LinearProgress color="info" />)}
      <DialogTitle id="title" onClose={onClose} className="justify-center align-text-bottom text-xs">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="alert-dialog-description"
          className="justify-center text-black"
        >
          {subtitle}
        </DialogContentText>
        {children}
      </DialogContent>
      {actions && (
      <DialogActions>
        <Button
          onClick={actionCancel}
          label="Cancelar"
          variant="outlined"
          icono={<CancelIcon />}
        />
        <Button
          onClick={(e) => { handleSubmit(actionSave)(e); }}
          label={labelButtonSave}
          icono={<AddIcon />}
        />
      </DialogActions>
      )}
    </DialogCustom>
  );
};

Dialog.propTypes = {
  handleSubmit: PropTypes.func,
  actionSave: PropTypes.func,
  actionCancel: PropTypes.func,
  maxWidth: PropTypes.string,
  subtitle: PropTypes.string,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  labelButtonSave: PropTypes.string,
  actions: PropTypes.bool,
  loading: PropTypes.bool,
};

Dialog.defaultProps = {
  handleSubmit: () => {},
  actionSave: () => {},
  actionCancel: () => {},
  maxWidth: 'xl',
  subtitle: '',
  actions: false,
  loading: false,
  labelButtonSave: 'Guardar',
};

export default Dialog;
