import React from 'react';
import { Backdrop } from '@mui/material';
import { BeatLoader } from 'react-spinners';
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
      <BeatLoader color={paleta.bar.primary} size={30} />
    </Backdrop>
  );
};
export default Loading;
