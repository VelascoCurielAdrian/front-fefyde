import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { MdFilterAlt } from 'react-icons/md';
import { Container } from './styles';
import CustomPagination from '../Pagination';
import EmptyRows from '../EmptyRows/component';
import Button from '../Button';

const TableBase = ({
  data,
  registrosPorPagina,
  countData,
  title,
  error,
  loading,
  columns,
  filtros,
  iconFileImport,
  fileImport,
  autoHeight,
  handleFilter,
  showPaginate,
  headerHeight,
  titleFileImport,
  handleFileImport,
  onChangePaginado,
  onPageChange,
}) => (
  <div className="md:col-span-2 md:mt-0 mb-8">
    <div className="overflow-hidden shadow sm:rounded-md">
      <div className="bg-white px-4 py-5 sm:p-6 h-140">
        <div className="col-span-12">
          <Container>
            <label
              htmlFor="label-form"
              className="block mb-2 text-sm  text-gray-500"
            >
              {title}
            </label>
            <div className="grid grid-cols-12 gap-2 mb-2">
              {fileImport && (
                <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-4">
                  <Button
                    size="medium"
                    label={titleFileImport}
                    fullWidth
                    className="bg-gray-700"
                    onClick={handleFileImport}
                    icono={iconFileImport}
                  />
                </div>
              )}
              {filtros && (
                <div className="col-span-12 lg:col-span-2 md:col-span-4 sm:col-span-4">
                  <Button
                    size="medium"
                    label="Filtros"
                    fullWidth
                    className="bg-gray-700"
                    onClick={handleFilter}
                    icono={<MdFilterAlt size={20} />}
                  />
                </div>
              )}
            </div>
            <DataGrid
              error={error}
              columns={columns}
              rows={data}
              paginationMode="server"
              rowCount={countData}
              onPaginationModelChange={onChangePaginado}
              hideFooterSelectedRowCount
              pageSize={registrosPorPagina}
              autoHeight={autoHeight}
              headerHeight={headerHeight}
              loading={loading}
              pagination
              components={{
                LoadingOverlay: LinearProgress,
                NoRowsOverlay: EmptyRows,
                Pagination: showPaginate && countData > registrosPorPagina && CustomPagination,
              }}
              sx={{
                [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none' },
                [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none' },
              }}
              disableColumnMenu
              disableRowSelectionOnClick
              disableColumnFilter
              onPageChange={(page) => onPageChange(page)}
            />
          </Container>
        </div>
      </div>
    </div>
  </div>
);

TableBase.propTypes = {
  error: PropTypes.bool,
  title: PropTypes.string,
  autoHeight: PropTypes.bool,
  countData: PropTypes.number,
  registrosPorPagina: PropTypes.number,
  showPaginate: PropTypes.bool,
  headerHeight: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.array]),
  columns: PropTypes.oneOfType([PropTypes.array]),
  fileImport: PropTypes.bool,
  titleFileImport: PropTypes.string,
  iconFileImport: PropTypes.element,
  handleFileImport: PropTypes.func,
  filtros: PropTypes.bool,
  loading: PropTypes.bool,
  handleFilter: PropTypes.func,
  onChangePaginado: PropTypes.func,
  onPageChange: PropTypes.func,
};

TableBase.defaultProps = {
  columns: [],
  data: [],
  title: '',
  countData: 0,
  registrosPorPagina: 5,
  autoHeight: false,
  showPaginate: false,
  headerHeight: 50,
  error: false,
  loading: false,
  onChangePaginado: () => {},
  fileImport: false,
  titleFileImport: '',
  iconFileImport: null,
  handleFileImport: () => {},
  onPageChange: () => {},
  filtros: false,
  handleFilter: () => {},
};

export default TableBase;
