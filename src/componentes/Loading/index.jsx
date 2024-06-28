import React from 'react';
import { Backdrop } from '@mui/material';
import { PulseLoader } from 'react-spinners';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import paleta from '../../configuracion/paleta';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <Backdrop
      open={isFetching > 0 || isMutating > 0}
      sx={{ color: 'rgba(0, 0, 0, 0.5)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    >
      <PulseLoader color={paleta.bar.primary} size={25} />
    </Backdrop>
  );
};
export default Loading;
