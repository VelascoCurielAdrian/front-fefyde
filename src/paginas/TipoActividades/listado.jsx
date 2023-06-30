/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdEdit } from 'react-icons/md';

import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  Tooltip,
  IconButton,
} from '@mui/material';
import EmptyRows from '../../componentes/EmptyRows/component';
import { TipoActividatesActions } from '../../validaciones/tipoActividades';

const Listado = ({ getId }) => {
  const { data } = useQuery({
    queryKey: ['tipoActividades'],
    queryFn: TipoActividatesActions.GET,
    select: (data) => data.sort((a, b) => b.id - a.id),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return (
    <TableContainer sx={{ overflowY: 'auto', maxHeight: 290 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>DECRIPCIÓN</TableCell>
            <TableCell>ACCIÓN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell aling="left">{item.nombre}</TableCell>
                <TableCell>
                  <Tooltip
                    title="Editar"
                    placement="left"
                    arrow
                    onClick={() => getId(item.id)}
                  >
                    <IconButton>
                      <MdEdit size={20} className="text-red-600" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="left" colSpan={23}>
                <EmptyRows />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Listado;
