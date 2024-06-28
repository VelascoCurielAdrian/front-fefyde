import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import TuneIcon from '@mui/icons-material/Tune';

import { GET_GRUPO_ASIGNADOS } from '../../validaciones/alumnos';
import Dialog from '../../componentes/Dialog';
import SelectField from '../../componentes/Formularios/SelectField';
import Button from '../../componentes/Button';
import useFiltersAlmuno from '../../store/alumnos';

const Filtros = ({ openFiltros, cerrarFiltros }) => {
  const { filtros, applyFilters, clearFilter } = useFiltersAlmuno();
  const {
    control, formState: { errors }, handleSubmit, reset,
  } = useForm({ defaultValues: filtros });

  const gruposAlumno = useQuery({
    queryKey: ['gruposIdentidad'],
    queryFn: () => GET_GRUPO_ASIGNADOS(),
  });

  const aplicarFiltros = (values) => {
    applyFilters(values);
  };

  const limpiarFiltros = () => {
    reset({ grupoID: null, evidenciaID: null });
    clearFilter();
  };

  return (
    <Dialog
      title="Filtros de alumnos por grupo"
      maxWidth="xs"
      open={openFiltros}
      onClose={cerrarFiltros}
      actionCancel={cerrarFiltros}
    >
      <Grid container spacing={1} mb={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box mb={1}>
            <SelectField
              label="Seleccione un grupo"
              labelProp="nombre"
              name="grupoID"
              options={gruposAlumno?.data || []}
              control={control}
              error={errors.grupoID}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Button
              fullWidth
              icono={<CleaningServicesIcon />}
              label="Limpiar"
              onClick={limpiarFiltros}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Button
              fullWidth
              onClick={handleSubmit(aplicarFiltros)}
              icono={<TuneIcon />}
              label="Aplicar"
            />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};

Filtros.propTypes = {
  openFiltros: PropTypes.bool.isRequired,
  cerrarFiltros: PropTypes.func.isRequired,
};

export default React.memo(Filtros);
