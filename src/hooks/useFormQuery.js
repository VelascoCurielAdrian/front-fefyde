import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { singular, plural } from '../helpers';
import axios from '../configuracion/axios';
import endpoints from '../configuracion/endpoints';
import { SUCCESS_DATA } from '../configuracion/mensajes';

const useFormQuery = ({
  id, reset, endpoint, redirect = true, params,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    enabled: Boolean(id),
    queryKey: [singular(endpoint), id],
    queryFn: () => axios.get(endpoints.base.url(endpoint, id), { params }),
  });

  const accion = useMutation({
    mutationFn: (body) => {
      const url = endpoints.base.url(endpoint);
      return id ? axios.put(url, body) : axios.post(url, body);
    },
    onSuccess: () => {
      toast.success(SUCCESS_DATA);
      if (redirect) navigate(-1);
      queryClient.invalidateQueries(plural(endpoint));
    },
  });

  useEffect(() => {
    if (id && data) {
      reset(data);
    }
  }, [data, id, reset]);

  return { accion, data };
};

export default useFormQuery;
