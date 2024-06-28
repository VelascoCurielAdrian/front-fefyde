import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { ButtonGroup } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import Table from '../../componentes/Table';
import { ALUMNOS } from '../../configuracion/endpoints';
import Estatus from '../../componentes/Estatus/component';

import {
  Actions,
  Container,
  ContentButton,
  TitleContainer,
  Component,
  SearchIconContainer,
  SearchInput,
} from './styles';
import Button from '../../componentes/Button';
import paleta from '../../configuracion/paleta';
import Filtros from './filtros';
import useFiltersAlmuno from '../../store/alumnos';
import EvidenciaAlumno from '../../componentes/ChipsAlumnos/EvidenciaAlumno';
import EstadoAvanceAlumno from '../../componentes/ChipsAlumnos/EstadoAvanceAlumno';

const columns = [
  {
    field: 'cuenta',
    headerName: 'CUENTA',
    flex: 1,
    minWidth: 90,
    editable: false,
  },
  {
    field: 'nombre',
    headerName: 'NOMBRE',
    flex: 1,
    minWidth: 180,
    valueGetter: ({ row }) => `${row?.nombre} ${row?.apellidoPaterno} ${row?.apellidoMaterno}`,
    editable: false,
  },
  {
    field: 'correo',
    headerName: 'CORREO',
    flex: 1,
    minWidth: 220,
    editable: false,
  },
  {
    field: 'grupoID',
    headerName: 'GRUPO',
    flex: 1,
    minWidth: 90,
    editable: false,
    valueGetter: ({ row }) => row?.grupo?.nombre,
  },
  {
    field: 'estatus',
    headerName: 'ESTATUS',
    flex: 1,
    minWidth: 100,
    editable: false,
    renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
  },
  {
    field: 'estatuss',
    headerName: 'ESTADOS DE AVANCE',
    flex: 1,
    minWidth: 242,
    editable: false,
    renderCell: ({ row }) => <EstadoAvanceAlumno usuario={row} />,
  },
  {
    field: 'customAction',
    headerName: 'BITACORA',
    minWidth: 120,
    flex: 1,
    editable: false,
    renderCell: ({ row }) => <EvidenciaAlumno usuario={row} />,
  },
];

export const Alumnos = ({ editar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filtros } = useFiltersAlmuno();
  const [, setSearchParams] = useSearchParams();
  const [txtBusqueda, setTxtBusqueda] = useState('');
  const [openFiltros, setOpenFiltros] = useState(false);

  const manejadorKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ txtBusqueda });
    }
  };

  const onAgregar = useCallback(() => {
    navigate(`${location.pathname}/formulario`);
  }, [location.pathname, navigate]);

  const abrirFiltros = () => setOpenFiltros(true);
  const cerrarFiltros = () => setOpenFiltros(false);

  return (
    <>
      <Actions>
        <Container flex={1}>
          <TitleContainer>
            <Typography variant="subtitle" noWrap>
              Catálogo de alumnos
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: paleta.bar.elements, fontSize: 12 }}
              noWrap
            >
              Módulo para consultar alumnos
            </Typography>
          </TitleContainer>
          <Component>
            <SearchIconContainer>
              <SearchIcon color="primary" />
            </SearchIconContainer>
            <SearchInput
              size="large"
              fullWidth
              placeholder="Buscar"
              value={txtBusqueda}
              onChange={({ target: { value } }) => setTxtBusqueda(value)}
              onKeyDown={manejadorKeyDown}
            />
          </Component>
          <ContentButton>
            <ButtonGroup fullWidth>
              <Button
                size="medium"
                fullWidth
                variant="contained"
                onClick={onAgregar}
                icono={<AddIcon size={18} />}
                label="Agregar"
              />
              <Button
                size="medium"
                fullWidth
                onClick={abrirFiltros}
                icono={<TuneIcon size={18} />}
                label="Filtros"
                sx={{
                  backgroundColor: '#BE8B3C',
                  '&:hover': {
                    backgroundColor: '#A3711D',
                  },
                }}
              />
            </ButtonGroup>
          </ContentButton>
        </Container>
      </Actions>
      <Table
        name="alumnos"
        uri={ALUMNOS}
        title=""
        subtitle=""
        columns={columns}
        height={370}
        filtros={filtros}
        showActions={editar}
        showHeader={false}
      />
      <Filtros
        openFiltros={openFiltros}
        cerrarFiltros={cerrarFiltros}
      />
    </>
  );
};

Alumnos.propTypes = {
  editar: PropTypes.bool,
};

Alumnos.defaultProps = {
  editar: true,
};
