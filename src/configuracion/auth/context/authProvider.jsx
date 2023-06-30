/* eslint-disable import/prefer-default-export */
import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './authContext';
import { authReducer } from './authReducer';
import { types } from '../types';

const init = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  return {
    logged: !!user,
    user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const login = (response) => {
    const usuario = { ...response };
    const action = { type: types.login, payload: usuario };
    localStorage.setItem('token', JSON.stringify(usuario));
    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('token');
    const action = { type: types.logout };
    dispatch(action);
  };
  const value = useMemo(() => ({
    ...authState, login, logout,
  }), [authState]);
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
