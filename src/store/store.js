import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { resourceSlice } from "./resource/resourceSlice";



const serializableMiddleware = store => next => action => {
  // Si la acción afecta a `client.firstDoc`, transformamos el valor
  if (action.payload?.client?.firstDoc instanceof QueryDocumentSnapshot) {
    action.payload.client.firstDoc = {
      id: action.payload.client.firstDoc.id,
      data: action.payload.client.firstDoc.data(),
    };
  }

  // Pasamos la acción transformada al siguiente middleware/reducer
  return next(action);
};


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    resource: resourceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["resource.activeResource.date"], // Ignora la ruta específica
        ignoredActionPaths: ["payload.date"], // Ignora `payload.date` en acciones
      },
    }),
});
