import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../Button';
import paleta from '../../configuracion/paleta';

import {
  Actions,
  Container,
  ContentButton,
  TitleContainer,
  Component,
  SearchIconContainer,
  SearchInput,
} from './styles';

const Header = ({
  title,
  search,
  subtitle,
  listado,
  goBack,
  agregar,
  handleNew,
  handleCreate,
  customBackFunction,
}) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleBack = () => {
    navigate(-1);
  };

  const [txtBusqueda, setTxtBusqueda] = useState('');

  const manejadorKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ query: txtBusqueda });
    }
  };

  return (
    <Actions>
      <Container flex={1}>
        <TitleContainer>
          <Typography variant="subtitle" noWrap>
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: paleta.bar.elements, fontSize: 12 }}
            noWrap
          >
            {subtitle}
          </Typography>
        </TitleContainer>
        {search && (
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
        )}
        {listado && (
          <>
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
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={manejadorKeyDown}
              />
            </Component>
            <ContentButton>
              <Button
                size="medium"
                fullWidth
                variant="contained"
                onClick={handleNew}
                icono={<AddIcon size={18} />}
                label="Agregar"
              />
            </ContentButton>
          </>
        )}

        {agregar && (
          <>
            <ContentButton>
              <Button
                size="medium"
                fullWidth
                variant="outlined"
                onClick={handleBack}
                icono={<CancelIcon size={18} />}
                label="Cancelar"
              />
            </ContentButton>
            <ContentButton>
              <Button
                size="medium"
                fullWidth
                variant="contained"
                onClick={handleCreate}
                icono={<SaveIcon size={18} />}
                label="Guardar"
              />
            </ContentButton>
          </>
        )}
        {goBack && (
          <ContentButton>
            <Button
              size="medium"
              fullWidth
              variant="contained"
              onClick={customBackFunction}
              icono={<ExitToAppIcon size={18} />}
              label="Regresar"
            />
          </ContentButton>
        )}
      </Container>
    </Actions>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
  listado: PropTypes.bool,
  goBack: PropTypes.bool,
  agregar: PropTypes.bool,
  handleNew: PropTypes.func,
  subtitle: PropTypes.string,
  handleCreate: PropTypes.func,
  customBackFunction: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  subtitle: '',
  agregar: false,
  search: false,
  listado: false,
  goBack: false,
  handleNew: () => { },
  handleCreate: () => { },
  customBackFunction: () => { },
};

export default Header;
