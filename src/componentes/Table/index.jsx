import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Confirmation from '../confirmation';
import TableBase from '../TableBase';
import Header from '../Header';

const Table = ({
  showHeader, showActions, showPaginate, uri,
  name, title, height, columns, mostrarListado, mostrarBuscador,
  fileExport, titleFileExport, iconFileExport, handleFileExport,
  fileImport, titleFileImport, iconFileImport, handleFileImport,
  subtitle, uriDelete, autoHeight, filtros, mostrarFiltros, handleFilter,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [txtBusqueda, setTxtBusqueda] = useState('');
  const open = Boolean(anchorEl);

  const { data, status, refetch } = useQuery({
    queryKey: [`listado - ${name}`, page, txtBusqueda, filtros],
    queryFn: () => uri({ ...filtros, txtBusqueda, pagina: page }),
    keepPreviousData: true,
  });

  const eliminarRegistro = useMutation({
    mutationFn: uriDelete,
    onSuccess: (result) => toast.success(result.mensaje),
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const showConfirm = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async () => {
    await eliminarRegistro.mutateAsync(deleteRow);
    await refetch();
    setAnchorEl(null);
  };

  const onEditar = useCallback((id) => {
    navigate(`${location.pathname}/formulario/${String(id)}`);
  }, [location.pathname, navigate]);

  const onPageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const onAgregar = useCallback(() => {
    navigate(`${location.pathname}/formulario`);
  }, [location.pathname, navigate]);

  const newColumns = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACCIONES',
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem
          onClick={() => onEditar(row.id)}
          icon={<FiEdit size={15} />}
          label="Editar"
        />,
        <GridActionsCellItem
          onClick={(e) => {
            showConfirm(e);
            setDeleteRow(row.id);
          }}
          icon={<MdOutlineDelete size={15} />}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <>
      {showHeader && (
      <Header
        search={mostrarBuscador}
        listado={mostrarListado}
        title={title}
        subtitle={subtitle}
        handleNew={onAgregar}
        busquedad={(value) => setTxtBusqueda(value)}
      />
      )}
      <TableBase
        height={height}
        fileExport={fileExport}
        iconFileExport={iconFileExport}
        titleFileExport={titleFileExport}
        handleFileExport={handleFileExport}
        fileImport={fileImport}
        iconFileImport={iconFileImport}
        titleFileImport={titleFileImport}
        handleFileImport={handleFileImport}
        filtros={mostrarFiltros}
        handleFilter={handleFilter}
        autoHeight={autoHeight}
        showPaginate={showPaginate}
        columns={showActions ? newColumns : columns}
        data={status === 'success' ? data.rows : []}
        countData={status === 'success' ? data.count : 0}
        pagina={page}
        registrosPorPagina={5}
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
  uri: PropTypes.func,
  uriDelete: PropTypes.func,
  showHeader: PropTypes.bool,
  columns: PropTypes.oneOfType([PropTypes.array]),
  height: PropTypes.number,
  showActions: PropTypes.bool,
  showPaginate: PropTypes.bool,
  autoHeight: PropTypes.bool,
  mostrarBuscador: PropTypes.bool,
  mostrarListado: PropTypes.bool,
  fileExport: PropTypes.bool,
  titleFileExport: PropTypes.string,
  iconFileExport: PropTypes.element,
  handleFileExport: PropTypes.func,
  fileImport: PropTypes.bool,
  titleFileImport: PropTypes.string,
  iconFileImport: PropTypes.element,
  handleFileImport: PropTypes.func,
  mostrarFiltros: PropTypes.bool,
  filtros: PropTypes.oneOfType([PropTypes.object]),
  handleFilter: PropTypes.func,
};

Table.defaultProps = {
  title: '',
  subtitle: '',
  uri: () => {},
  uriDelete: () => {},
  showHeader: true,
  autoHeight: true,
  showPaginate: true,
  showActions: false,
  mostrarBuscador: false,
  mostrarListado: true,
  height: 400,
  columns: [],
  fileExport: false,
  titleFileExport: '',
  iconFileExport: null,
  handleFileExport: () => {},
  fileImport: false,
  titleFileImport: '',
  iconFileImport: null,
  handleFileImport: () => {},
  mostrarFiltros: false,
  filtros: null,
  handleFilter: () => {},
};

export default Table;
