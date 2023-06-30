import axios from '../configuracion/axios';
import endpoints from '../configuracion/endpoints';

export const iniciarSession = (usuarioLogin) => axios.post(endpoints.iniciarSesion(), usuarioLogin);

export const PermisoSecciones = (usuarioID, perfilID) => axios.get(endpoints.permisos(), {
  params: {
    usuarioID,
    perfilID,
  },
});

export const PermisoSeccionesV2 = (usuarioID, perfilID) => axios.get(endpoints.permisos(), {
  params: {
    usuarioID,
    perfilID,
  },
});
