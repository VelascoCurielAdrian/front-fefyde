import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FiSave } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import paleta from '../../configuracion/paleta';

import {
  Actions, Container, ContentButton,
  TitleContainer, Component, SearchIcon, SearchInput,
} from './styles';

const Header = ({
  name, title, search, subtitle, listado,
  agregar, handleNew, handleCreate, busquedad,
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/${name}`, {
      replace: true,
    });
  };

  const [txtBusqueda, setTxtBusqueda] = useState('');

  const manejadorKeyDown = (e) => {
    if (e.key === 'Enter') {
      busquedad(txtBusqueda);
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
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
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
        )}
        {listado && (
        <>
          <Component>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
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
              icono={<BsPlusLg size={16} />}
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
              variant="contained"
              onClick={handleBack}
              icono={<GiCancel size={16} />}
              label="Cancelar"
            />
          </ContentButton>
          <ContentButton>
            <Button
              size="medium"
              fullWidth
              variant="contained"
              onClick={handleCreate}
              icono={<FiSave size={16} />}
              label="Guardar"
            />
          </ContentButton>
        </>
        )}
      </Container>
    </Actions>
  );
};

Header.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  search: PropTypes.bool,
  listado: PropTypes.bool,
  agregar: PropTypes.bool,
  handleNew: PropTypes.func,
  busquedad: PropTypes.func,
  subtitle: PropTypes.string,
  handleCreate: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  name: '',
  subtitle: '',
  agregar: false,
  search: false,
  listado: false,
  busquedad: () => {},
  handleNew: () => {},
  handleCreate: () => {},
};

export default Header;
