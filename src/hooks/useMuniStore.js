//Tiene como objetivo realizar cualquier interacion con
//la parte del resource de nuestro store

import { useDispatch, useSelector } from "react-redux";

import muniApi from "../apis/muniApi";
import {
  addNewMovement,
  addNewResource,
  clearErrorMessageResource,
  deleteResourceById,
  deleteResourceGroup,
  setActiveMovement,
  setActiveResource,
  setAlertMessage,
  setErrorMessage,
  setIsLoading,
  setIsLoadingMovement,
  setMovements,
  setPaginationMovements,
  setResources,
  updateResource,
} from "../store/resource/resourceSlice";
import { getAxiosErrorMessage } from "../helpers";
import { addNewWorker, clearErrorMessageWorker, deleteWorkerById, setActiveWorker, setAlertMessageWorker, setErrorMessageWorker, setIsLoadingWorker, setMovementsWorker, setWorkers, setWorkersNames } from "../store/worker/workerSlice";
import { s } from "framer-motion/client";
import { limit } from "firebase/firestore";

export const useMuniStore = () => {
  const { isLoading, movements, activeResource, paginationMovements } = useSelector((state) => state.resource);
  const dispatch = useDispatch();

  const startLoadingResourcesLite = async () => {
    dispatch(setIsLoading(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un body con los datos del email y el password
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.get("/resources/lite");

      dispatch(setResources(data.resources));
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startAddResource = async (newResource) => {
    dispatch(setIsLoading(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un body con los datos para crear en nuevo elemento
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.post("/resources/", newResource);

      dispatch(addNewResource(data.resource));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startLoadingMovements = async (from, to) => {
    dispatch(setIsLoading(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un params con los datos para buscar
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.get("/movements", {
        params: {
          from: from,
          to: to,
        },
      });

      dispatch(setMovements(data.movements));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startAddMovement = async (newMovement) => {
    dispatch(setIsLoading(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un body con los datos para crear en nuevo elemento
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.post("/movements", newMovement);

      dispatch(addNewMovement(data.movement));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      dispatch(setErrorMessage(errorMessage));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startLoadingResourceById = async (id) => {
    dispatch(setIsLoading(true));
   

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un params con los datos para buscar
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.get(`/resources/${id}`);
      dispatch(setActiveResource(data.resource));
      

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
   
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startLoadingMovementById = async (id) => {
    dispatch(setIsLoading(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un params con los datos para buscar
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.get(`/movements/${id}`);

      console.log(data);
      
      dispatch(setActiveMovement(data.movement));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startLoadingMovementOfResource = async (id, page) => {
    dispatch(setIsLoadingMovement(true));



    try {

      const { data } = await muniApi.get(`/resources/recordHistory/${id}`,{
        params: {page: page}
      });

      dispatch(setMovements(data.recordHistory));

      dispatch(setPaginationMovements(data.pagination))

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoadingMovement(false)); // Finalizar carga
    }
  };
  

  const startUpdatingResource = async (newResource) => {
    dispatch(setIsLoading(true));

    try {
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.put(
        `/resources/${newResource.id}`,
        newResource
      );

      dispatch(updateResource(data.resource));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessage(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startDeletingResourceById = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await muniApi.delete(`/resources/${id}`);

      dispatch(deleteResourceById(data.resource));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      dispatch(setErrorMessage(errorMessage));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startDeletingResourceGroup = async (ids) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await muniApi.delete(`/resources`, {
        data: {
          ids: ids
        },
      });

      dispatch(deleteResourceGroup(ids));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      dispatch(setErrorMessage(errorMessage));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageResource());
      }, 1000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };

  const startAddWorker = async (newWorker) => {
    dispatch(setIsLoadingWorker(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un body con los datos para crear en nuevo elemento
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.post("/workers/", newWorker);

      dispatch(addNewWorker(data.worker));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessageWorker(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageWorker());
      }, 1000);
    } finally {
      dispatch(setIsLoadingWorker(false)); // Finalizar carga
    }
  };


  const startLoadingWorker = async (page, limit) => {
    dispatch(setIsLoadingWorker(true));

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un body con los datos del email y el password
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.get("/workers/",{
        params: {
          page: page,
          limit: limit
        }
      });

      console.log(data);
      

      dispatch(setWorkers(data.workers));
    } catch (error) {
      dispatch(setErrorMessageWorker(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageWorker());
      }, 1000);
    } finally {
      dispatch(setIsLoadingWorker(false)); // Finalizar carga
    }
  };


  const startDeletingWorkerById = async (id) => {
    dispatch(setIsLoadingWorker(true));

    try {
      const { data } = await muniApi.delete(`/workers/${id}`);

      dispatch(deleteWorkerById(data.worker));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessageWorker(null)), 3000);
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      dispatch(setErrorMessageWorker(errorMessage));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageWorker());
      }, 1000);
    } finally {
      dispatch(setIsLoadingWorker(false)); // Finalizar carga
    }
  };


   const startLoadingWorkerByIdWithPagination = async (id, page = 1, limit = 10) => {
    dispatch(setIsLoadingWorker(true));
   

    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un params con los datos para buscar
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.get(`/workers/${id}`, {
        params: {
          page: page,
          limit : limit

        }
      });

      dispatch(setActiveWorker(data.worker));

      // Limpiar alertas
      setTimeout(() => dispatch(setAlertMessageWorker(null)), 3000);
    } catch (error) {
      dispatch(setErrorMessageWorker(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageWorker());
      }, 1000);
    } finally {

      dispatch(setIsLoadingWorker(false)); // Finalizar carga
    }
  };


  const startLoadingMovementOfWorkerById = async (id, page = 1, limit = 10) => {
    dispatch(setIsLoadingWorker(true));

    try {
      const { data } = await muniApi.get(`/workers/${id}/history`, {
        params: {
          page: page,
          limit: limit
        }
      });

      dispatch(setMovementsWorker(data.worker.recordHistory));


    } catch (error) {
      dispatch(setErrorMessageWorker(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageWorker());
      }, 1000);
    } finally {
      dispatch(setIsLoadingWorker(false)); // Finalizar carga
    }
  };

  const startLoadingWorkersNames = async () => {
    dispatch(setIsLoadingWorker(true));

    try {
      const { data } = await muniApi.get("/workers/displayNames");

      dispatch(setWorkersNames(data.workers));
    } catch (error) {
      dispatch(setErrorMessageWorker(error));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessageWorker());
      }, 1000);
    } finally {
      dispatch(setIsLoadingWorker(false)); // Finalizar carga
    }
  };

  return {
    //*Properties
    isLoading,
    movements,
    activeResource,
    paginationMovements,

    //*Methods
    startLoadingResourcesLite,
    startAddResource,
    startLoadingMovements,
    startAddMovement,
    startLoadingResourceById,
    startLoadingMovementById,
    startUpdatingResource,
    startDeletingResourceById,
    startDeletingResourceGroup,
    startLoadingMovementOfResource,
    startLoadingWorker,
    startAddWorker,
    startDeletingWorkerById,
    startLoadingWorkerByIdWithPagination,
    startLoadingMovementOfWorkerById,
    startLoadingMovementById,
    startLoadingWorkersNames,
  };
};
