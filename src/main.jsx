import React from 'react';
import ReactDOM from 'react-dom/client';
import { Worker } from '@react-pdf-viewer/core';
import 'react-toastify/dist/ReactToastify.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';
import App from './App';
import { queryClient } from './configuracion/generales';
import { Toast } from './componentes/Toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <App />
      </Worker>
      <Toast />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
