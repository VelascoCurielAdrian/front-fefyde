import { useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ERROR } from '../configuracion/mensajes';
import { singular, plural } from '../helpers';
import axios from '../configuracion/axios';
import endpoints from '../configuracion/endpoints';

/**
  * Este es un enlace personalizado en JavaScript que maneja
  * el envío de formularios y la consulta de datos usando React Query.
  * @returns La función `useFormQuery` devuelve un objeto con dos propiedades: `accion` y `data`.
*/
const useFormQuery = ({
  id, reset, endpoint, redirect = true,
  params, defaultValues,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: [singular(endpoint), id],
    queryFn: () => axios.get(endpoints.base.url(endpoint, id), { params }),
    enabled: !!id,
    onError: () => {
      toast.error(ERROR);
    },
  });

  const regresar = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (id && data) {
      reset(data);
    }

    if (!id) {
      reset(defaultValues);
    }
  }, [data, defaultValues, id, reset]);

  const accion = useMutation({
    mutationFn: (body) => {
      if (id) {
        return axios.put(endpoints.base.url(endpoint), body);
      }
      return axios.post(endpoints.base.url(endpoint), body);
    },
    onSuccess: (result) => {
      toast.success(result.mensaje);
      if (!id) {
        queryClient.setQueryData([plural(endpoint)], (prevData) => prevData?.concat(result.data));
      }
      if (redirect) {
        regresar();
      }
      queryClient.invalidateQueries(plural(endpoint));
    },
  });

  return { accion, data };
};

export default useFormQuery;
