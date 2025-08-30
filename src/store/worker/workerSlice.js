import { createSlice } from "@reduxjs/toolkit";
export const workerSlice = createSlice({
  name: "worker",
  initialState: {
    alertMessage: null,
    isLoading: false,
    errorMessage: null,
    activeWorker: null,
    filterWorkers: [],
    workers: [],
    workersNames: [],
    movements: [],
    activeMovements: null,
  },
  reducers: {
    setActiveWorker: (state, { payload }) => {
      state.activeWorker = payload;
    },
    clearActiveWorker: (state) => {
      state.activeWorker = null;
    },
    setWorkers: (state, { payload }) => {
      state.workers = [...payload];
      state.filterWorkers = [...payload];
    },
    addNewWorker: (state, { payload }) => {
      state.workers = [payload, ...state.workers];
      state.filterWorkers = [payload, ...state.filterWorkers];
      state.alertMessage = "Se añadio el nuevo trabajador con exito";
    },
    deleteWorkerById: (state, { payload }) => {
      state.workers = state.workers.filter(
        (worker) => worker.id !== payload.id
      );
      state.filterWorkers = [...state.workers];
      state.alertMessage = "Se elimino el trabajador correctamente";
    },
    setErrorMessageWorker: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessageWorker: (state) => {
      state.errorMessage = null;
    },
    setIsLoadingWorker: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAlertMessageWorker: (state, { payload }) => {
      state.alertMessage = payload;
    },
    filterWorkers: (state, { payload }) => {
      if (payload == "") {
        state.filterWorkers = state.workers;
      } else {
        const searchTerm = payload.toLowerCase();
        state.filterWorkers = state.workers.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
      }
    },
    updateWorker: (state, { payload }) => {
      const index = state.workers.findIndex(
        (worker) => worker.id === payload.id
      );
      if (index !== -1) {
        state.workers[index] = payload;
      }
    },
    showWorker: (state, { payload }) => {
      state.activeWorker = state.workers.find((item) => item.id === payload);
    },
    setMovementsWorker: (state, { payload }) => {
      state.movements = [...payload];
    },
    activeMovementsWorker: (state, { payload }) => {
      state.activeMovements = payload;
    },
    setWorkersNames: (state, { payload }) => {
      state.workersNames = [...payload];
    },
  },
});

export const {
  setActiveWorker,
  clearActiveWorker,
  setErrorMessageWorker,
  setIsLoadingWorker,
  setAlertMessageWorker,
  filterWorkers,
  updateWorker,
  showWorker,
  addNewWorker,
  deleteWorkerById,
  deleteWorkerGroup,
  setWorkers,
  clearErrorMessageWorker,
  setMovementsWorker,
  activeMovementsWorker,
  setWorkersNames
} = workerSlice.actions;
