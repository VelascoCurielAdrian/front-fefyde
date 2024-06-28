import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Container } from './styles';
import CustomPagination from '../Pagination';
import EmptyRows from '../EmptyRows/component';

const TableBase = ({
  data, registrosPorPagina,
  countData, error, loading,
  columns, autoHeight, showPaginate,
  onChangePaginado, onPageChange, headerHeight,
}) => (
  <div className="md:col-span-2 md:mt-0 mb-8">
    <div className="bg-slate-200 overflow-hidden rounded-2xl">
      <div className="px-4 py-5 sm:p-6 h-100">
        <div className="col-span-12">
          <Container>
            <DataGrid
              error={error}
              columns={columns}
              rows={data}
              paginationMode="server"
              rowCount={countData}
              onPaginationModelChange={onChangePaginado}
              hideFooterSelectedRowCount
              autoHeight={autoHeight}
              pageSize={registrosPorPagina}
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
  autoHeight: PropTypes.bool,
  countData: PropTypes.number,
  registrosPorPagina: PropTypes.number,
  showPaginate: PropTypes.bool,
  headerHeight: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.array]),
  columns: PropTypes.oneOfType([PropTypes.array]),
  loading: PropTypes.bool,
  onChangePaginado: PropTypes.func,
  onPageChange: PropTypes.func,
};

TableBase.defaultProps = {
  columns: [],
  data: [],
  countData: 0,
  registrosPorPagina: 5,
  autoHeight: false,
  showPaginate: false,
  headerHeight: 50,
  error: false,
  loading: false,
  onChangePaginado: () => {},
  onPageChange: () => {},
};

export default TableBase;
