import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ValidacionMultiples } from '../validaciones/alumnos';
import axios from '../configuracion/axios';
import endpoints, { GRUPOS } from '../configuracion/endpoints';
import { ERROR, ERROR_EXCEL, ERROR_EXCEL_CUENTA_REPETIDA } from '../configuracion/mensajes';
import { encontrarElementoRepetido, exportExcel, generatePassword } from '../helpers';

// Valores por defecto para el formulario de múltiples alumnos
const defaultValues = {
  grupoID: '',
};

const useAlumnos = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [fileExcel, setFileExcel] = useState([]);
  const [openModal, setOpenModal] = useState({
    state: false,
    key: '',
    title: '',
    info: {},
  });
  const [tabValue, setTabValue] = useState(0);
  const [isDetail, setIsDetail] = useState(false);

  // Configuración y validación del formulario usando React Hook Form
  const {
    control, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(ValidacionMultiples),
  });

  const gruposAlumno = useQuery({
    queryKey: ['grupos'],
    queryFn: () => axios.get(endpoints.base.url(GRUPOS)),
  });

  // Configuración del uso de la mutación para realizar acciones en los Alumnos
  const acciones = useMutation({
    mutationFn: (body) => axios.post(endpoints.alumnos.multiples(), body),
    onSuccess: (result) => {
      toast.success(result.mensaje);
      navigate('/alumnos', {
        replace: true,
      });
      queryClient.setQueryData(['alumnos'], (prevData) => prevData?.concat(result.data));
      queryClient.invalidateQueries('alumnos');
    },
  });

  // Función para obtener y procesar archivos de Excel
  const obtenerArchivos = useCallback((files) => {
    const errores = 0;
    const cuentaRepetida = encontrarElementoRepetido(files.map(({ cuenta }) => cuenta));
    if (cuentaRepetida) {
      toast.warning(ERROR_EXCEL_CUENTA_REPETIDA);
      return;
    }
    const nuevaData = files.map((user) => ({
      ...user,
      cuenta: user.cuenta.toString(),
      password: generatePassword(),
      userName: user.cuenta.toString(),
    }));
    if (errores > 0) {
      toast.error(ERROR_EXCEL);
      return;
    }
    setFileExcel(nuevaData);
  }, []);

  // Función para cancelar la selección de archivos de Excel
  const cancelarArchivo = useCallback(() => {
    setFileExcel([]);
  }, []);

  // Función para cambiar la pestaña de detalles
  const cambiarTab = useCallback((_, value) => {
    setTabValue(value);
  }, []);

  // Función para guardar los datos de los alumnos
  const guardar = useCallback(async (values) => {
    try {
      if (fileExcel.length === 0) {
        return toast.warning('Debe al menos agregar un alumno');
      }
      const alumnos = fileExcel.map((el) => ({
        ...el,
        ...values,
      }));
      return await acciones.mutateAsync({ alumnos });
    } catch (error) {
      return toast.warning(error?.data || ERROR);
    }
  }, [acciones, fileExcel]);

  // Función para descargar la plantilla de Excel para los alumnos
  const descargarPlantilla = useCallback(() => {
    const data = [
      {
        cuenta: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefonoFijo: '',
        telefonoCelular: '',
        correo: '',
      },
    ];
    exportExcel(data, 'Plantilla Alumnos');
  }, []);

  // Función para abrir el modal de información de detalle
  const openModalInfo = useCallback(({ key, info, titulo }) => {
    setOpenModal({
      state: true,
      titulo,
      info,
      key,
    });
    setIsDetail(false);
  }, []);

  // Función para cerrar el modal de información de detalle
  const cerrarModalInfo = useCallback(() => {
    setOpenModal({ state: false, key: '' });
  }, []);

  return {
    gruposAlumno,
    errors,
    control,
    guardar: handleSubmit(guardar),
    descargarPlantilla,
    obtenerArchivos,
    cancelarArchivo,
    cambiarTab,
    tabValue,
    cerrarModalInfo,
    openModalInfo,
    openModal,
    isDetail,
    fileExcel,
    setValue,
  };
};

export default useAlumnos;
