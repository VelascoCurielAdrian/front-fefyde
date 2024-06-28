import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import BackupIcon from '@mui/icons-material/Backup';
import Chip from '@mui/material/Chip';

const ContainerChip = styled(Chip)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 100,
  borderRadius: 5,
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: '#2D4D7A',
  },
}));

const EvidenciaAlumno = ({ usuario }) => {
  const navigate = useNavigate();
  const handleViewFiles = useCallback(() => {
    if (usuario) {
      navigate(`/alumnos/bitacora/${usuario.id}`, {
        state: usuario,
      });
    }
  }, [navigate, usuario]);

  return (
    <ContainerChip
      size="small"
      label="Ver"
      color="primary"
      onClick={handleViewFiles}
      icon={<BackupIcon />}
    />
  );
};

EvidenciaAlumno.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(EvidenciaAlumno);
