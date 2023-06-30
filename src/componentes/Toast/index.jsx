/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const Toast = () => (
  <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);
