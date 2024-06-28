import { create } from 'zustand';

const useFiltersAlmuno = create((set) => ({
  filtros: {
    grupoID: '',
    evidenciaID: null,
  },
  applyFilters: (filtros) => set(() => ({ filtros })),
  clearFilter: () => set(() => ({
    filtros: {
      grupoID: '',
      evidenciaID: null,
    },
  })),
}));

export default useFiltersAlmuno;
