import React from 'react';
import propTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const RutaPublica = ({ estaAutenticado, children }) => {
  if (estaAutenticado) { return <Navigate to="/" replace />; }
  return children || <Outlet />;
};

RutaPublica.propTypes = {
  /** Componente a renderizar */
  children: propTypes.node,
  /** Indica si el usuario esta autenticado */
  estaAutenticado: propTypes.bool,
};

RutaPublica.defaultProps = {
  children: null,
  estaAutenticado: false,
};

export default RutaPublica;
