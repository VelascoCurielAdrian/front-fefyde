import React, { createRef } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { Navigate, useLocation, useOutlet } from 'react-router-dom';
import DashBoard from '../../componentes/DashBoard';
import rutas from '../../rutas';

const RutaPrivada = ({ estaAutenticado }) => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const rutaRef = createRef(null);
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }
  const { nodeRef } = rutas.find((route) => route.path === location.pathname) ?? {};
  return (
    <DashBoard>
      <motion.div
        key={location.pathname}
        ref={nodeRef || rutaRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {currentOutlet}
      </motion.div>
    </DashBoard>
  );
};

RutaPrivada.propTypes = {
  /** Indica si el usuario esta autenticado */
  estaAutenticado: propTypes.bool,
};

RutaPrivada.defaultProps = {
  estaAutenticado: false,
};

export default React.memo(RutaPrivada);
