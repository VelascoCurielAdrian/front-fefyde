import React, { useCallback, useState, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MdEdit from '@mui/icons-material/Edit';

import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Confirmation from '../confirmation';
import TableBase from '../TableBase';
import Header from '../Header';

import axios from '../../configuracion/axios';
import endpoints from '../../configuracion/endpoints';

const Table = ({
  showHeader, showActions, showPaginate, uri, name, title, filtros, goBack,
  height, columns, mostrarListado, mostrarBuscador, subtitle, autoHeight, customBackFunction,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const txtBusquedaQuery = searchParams.get('txtBusqueda');

  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const open = Boolean(anchorEl);

  const { data, status, refetch } = useQuery({
    queryKey: [`listado - ${name}`, page, txtBusquedaQuery, filtros],
    queryFn: () => axios.get(endpoints.base.listado(uri), {
      params: {
        ...filtros,
        txtBusqueda: txtBusquedaQuery,
        pagina: page,
      },
    }),
  });

  const eliminarRegistro = useMutation({
    mutationFn: (id) => axios.delete(endpoints.base.url(uri, id)),
    onSuccess: (result) => toast.success(result.mensaje),
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const showConfirm = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleDelete = async () => {
    await eliminarRegistro.mutateAsync(deleteRow);
    await refetch();
    setAnchorEl(null);
  };

  const onEditar = useCallback(
    (row) => {
      navigate(`${location.pathname}/formulario/${String(row.id)}`, {
        state: row,
      });
    },
    [location.pathname, navigate],
  );

  const onPageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const onAgregar = useCallback(() => {
    navigate(`${location.pathname}/formulario`);
  }, [location.pathname, navigate]);

  const newColumns = useMemo(() => [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACCIONES',
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem
          onClick={() => onEditar(row)}
          icon={<MdEdit size={15} />}
          color="primary"
          label="Editar"
        />,
        <GridActionsCellItem
          onClick={(e) => {
            showConfirm(e);
            setDeleteRow(row.id);
          }}
          icon={<DeleteIcon size={15} />}
          color="primary"
          label="Delete"
        />,
      ],
    },
  ], [columns, onEditar, showConfirm, setDeleteRow]);

  return (
    <>
      {showHeader && (
        <Header
          name={name}
          goBack={goBack}
          search={mostrarBuscador}
          listado={mostrarListado}
          title={title}
          subtitle={subtitle}
          customBackFunction={customBackFunction}
          handleNew={onAgregar}
        />
      )}
      <TableBase
        height={height}
        autoHeight={autoHeight}
        showPaginate={showPaginate}
        columns={showActions ? newColumns : columns}
        data={status === 'success' ? data.rows : []}
        countData={status === 'success' ? data.count : 0}
        pagina={page}
        registrosPorPagina={10}
        onPageChange={onPageChange}
      />
      <Confirmation
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};

Table.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  uri: PropTypes.string,
  showHeader: PropTypes.bool,
  columns: PropTypes.oneOfType([PropTypes.array]),
  height: PropTypes.number,
  showActions: PropTypes.bool,
  goBack: PropTypes.bool,
  showPaginate: PropTypes.bool,
  autoHeight: PropTypes.bool,
  mostrarBuscador: PropTypes.bool,
  mostrarListado: PropTypes.bool,
  customBackFunction: PropTypes.func,
  filtros: PropTypes.oneOfType([PropTypes.object]),
};

Table.defaultProps = {
  title: '',
  subtitle: '',
  uri: '',
  showHeader: true,
  goBack: false,
  autoHeight: true,
  showPaginate: true,
  showActions: false,
  mostrarBuscador: false,
  mostrarListado: true,
  height: 400,
  columns: [],
  customBackFunction: () => { },
  filtros: null,
};

export default React.memo(Table);
