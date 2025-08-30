import { createSlice } from "@reduxjs/toolkit";
import { a } from "framer-motion/client";
import { resources } from "../../data/data";
export const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    alertMessage: null,
    isLoading: false,
    errorMessage: null,
    activeResource: null,
    activeMovement: null,
    resources: [],
    filterResources: [],
    movements: [],
    isLoadingMovement: false,
    paginationMovements: [],
    outputs: [],
  },
  reducers: {
    setActiveResource: (state, { payload }) => {
      state.activeResource = payload;
    },
    setActiveMovement: (state, { payload }) => {
      console.log(payload);
      
      state.activeMovement = payload;
    },
    setResources: (state, { payload }) => {
      state.resources = [...payload];
      state.filterResources = [...payload];
    },
    addNewResource: (state, { payload }) => {
      state.resources = [payload, ...state.resources];
      state.filterResources = [payload, ...state.filterResources];
      state.alertMessage = "Se añadio el nuevo recurso con exito";
    },
    addNewMovement: (state, { payload }) => {
      state.movements = [payload, ...state.movements];
      state.alertMessage = "Se añadio el nuevo movimiento con exito";
    },
    addNewStockIn: (state, { payload }) => {
      state.movements.unshift(payload);
      state.alertMessage = "Se añadio la nueva entrada con exito";
    },
    addNewStockOut: (state, { payload }) => {
      state.movements.unshift(payload);
      state.alertMessage = "Se añadio la nueva salida con exito";
    },
    deleteResourceById: (state, { payload }) => {
      state.resources = state.resources.filter(resource => resource.id !== payload.id);
      state.filterResources = [...state.resources];
      state.alertMessage = "Se elimino el recurso correctamente";
    },    
    deleteResourceGroup: (state, { payload }) => {
      state.resources = state.resources.filter(
        resource => !payload.includes(resource.id)
      );
      state.filterResources = [...state.resources];
      state.alertMessage = "Se eliminaron los recursos correctamente";
    },  
    setMovements: (state, { payload }) => {
      state.movements = payload;
    },
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsLoadingMovement: (state, { payload }) => {
      state.isLoadingMovement = payload;
    },
    setAlertMessage: (state, { payload }) => {
      state.alertMessage = payload;
    },
    clearErrorMessageResource: (state) => {
      state.errorMessage = null;
    },
    clearActiveResource: (state) => {
      state.activeResource = null;
    },
    clearActiveMovement: (state) => {
      state.activeMovement = null;
    },
    filterResources: (state, { payload }) => {
      if (payload == "") {
        state.filterResources = state.resources;
      } else {
        const searchTerm = payload.toLowerCase();
        state.filterResources = state.resources.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
      }
    },
    updateResource: (state, { payload }) => {
      const index = state.resources.findIndex(
        (resource) => resource.id === payload.id
      );
      if (index !== -1) {
        state.resources[index] = payload;
      }
    },
    showResource: (state, { payload }) => {
      state.activeResource = state.resources.find(
        (item) => item.id === payload
      );
    },
    setPaginationMovements: (state, {payload}) => {
      state.paginationMovements = payload;
    }
  },
});

export const {
  addNewResource,
  addNewStockIn,
  addNewStockOut,
  clearActiveResource,
  filterResources,
  setActiveResource,
  setAlertMessage,
  setErrorMessage,
  setInputs,
  setIsLoading,
  setMovements,
  setResources,
  showResource,
  clearActiveMovement,
  updateResource,
  setActiveMovement,
  addNewMovement,
  deleteResourceById,
  deleteResourceGroup,
  clearErrorMessageResource,
  setPaginationMovements,
  setIsLoadingMovement,
  clearErrorMessageMovement
} = resourceSlice.actions;
