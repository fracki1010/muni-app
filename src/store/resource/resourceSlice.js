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
    resources: [],
    filterResources: [],
    inputs: [],
    outputs: [],
  },
  reducers: {
    setActiveResource: (state, { payload }) => {
      state.activeResource = payload;
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
    setInputs: (state, { payload }) => {
      state.inputs = payload;
    },
    addNewStockIn: (state, { payload }) => {
      state.inputs.unshift(payload);
    },
    addNewStockOut: (state, { payload }) => {
      state.outputs.unshift(payload);
    },
    setOutputs: (state, { payload }) => {
      state.outputs = payload;
    },
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAlertMessage: (state, { payload }) => {
      state.alertMessage = payload;
    },
    clearActiveResource: (state) => {
      state.activeResource = null;
    },
    filterResources: (state, { payload }) => {
      if ( payload == '' ) {
        state.filterResources = state.resources;
      } else {
        const searchTerm = payload.toLowerCase();
        state.filterResources = state.resources.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
      }
    },
    showResource: (state, {payload}) => {
      state.activeResource = state.resources.find((item) => item.id === payload)
    },
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
  setOutputs,
  setResources,
  showResource,
} = resourceSlice.actions;
