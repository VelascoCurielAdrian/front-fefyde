/* eslint-disable no-unused-vars */
import React, { createRef } from 'react';
import propTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import {
  Navigate, useLocation, useOutlet,
} from 'react-router-dom';
import DashBoard from '../../componentes/DashBoard';
import rutas from '../../rutas';

const RutaPrivada = ({ estaAutenticado }) => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const rutaRef = createRef(null);
  if (!estaAutenticado) { return <Navigate to="/login" replace />; }
  const { nodeRef } = rutas.find((route) => route.path === location.pathname) ?? {};
  return (
    <DashBoard>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef || rutaRef}
          timeout={250}
          classNames="page"
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
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
