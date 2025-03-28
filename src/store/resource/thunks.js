import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewResource,
  addNewStockIn,
  addNewStockOut,
  clearActiveResource,
  setActiveResource,
  setAlertMessage,
  setErrorMessage,
  setInputs,
  setIsLoading,
  setOutputs,
  setResources,
} from "./resourceSlice";
import { getResourceSearch } from "../../helpers/getResourceSearch";
import { getSearchInputAndOutput } from "../../helpers/getSearchInputAndOutput";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";

export const startAddStockIn = (isNewResource, idResource, resourceSend) => {
  return async (dispatch, getState) => {

    const {activeResource} = useSelector(state => state.resource)

    const newStockIn = {
      ...resourceSend,
    };

    

    let resourceAuxDB;
    try {
      if (!isNewResource) {
        
        
        const { resourceDB, resourceUpdate } = await getResourceSearch(
          activeResource
        );

        resourceAuxDB = resourceDB; //Este aux es para mas adelante porque se borra el id

        //Esto convierte los string en numeros, los suma y los vuelve a convertir en string
        resourceUpdate.quantity = (
          Number(resourceUpdate.quantity) + Number(activeResource.quantity)
        ).toString();

        const docRef = doc(FirebaseDB, `resources/${resourceUpdate.id}`);

        //quitarle el id al resource que vamos a actualizar
        delete resourceUpdate.id;

        await setDoc(docRef, resourceUpdate, { merge: true });
      }
      //*------------Creacion del stockIn----------------------------
      //referiencia al documento buscado
      const newDocStockIn = doc(collection(FirebaseDB, `inputs`));

      //Agregando la unidad
      newStockIn.unit = isNewResource
        ? resourceSend.unit
        : resourceAuxDB.unit;

      //Agregando el id del recurso al que pertenecen
      newStockIn.idResource = isNewResource ? idResource : resourceAuxDB.id;

      console.log(newStockIn);

      //Guardar el objeto en la referencia
      await setDoc(newDocStockIn, newStockIn);

      //Añadir el id de la ubicacion al stockIn
      newStockIn.id = newDocStockIn.id;

      //Creando input en redux
      dispatch(addNewStockIn(newStockIn));
      dispatch(startLoadingResources());

      //Limpiar el alert
      setTimeout(() => {
        dispatch(setAlertMessage(null));
      }, 3000);
      //*----------------------------------------------------
    } catch (error) {
      console.error("Error al crear la entrada:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startAddResource = () => {
  return async (dispatch, getState) => {
    const { activeResource } = getState().resource;

    const newResource = {
      ...activeResource,
    };

    delete newResource.description;
    delete newResource.withdrawer;
    delete newResource.delete;

    try {
      //*------------Creacion del cliente----------------------------
      //referiencia al documento buscado
      const newDocResource = doc(collection(FirebaseDB, `resources`));
      //   const newDocStockIn = doc(collection(FirebaseDB, `inputs`));

      //Guardar el objeto en la referencia
      await setDoc(newDocResource, newResource);
      //   await setDoc(newDocStockIn, newStockIn);

      //Añadir el id de la ubicacion al cliente
      newResource.id = newDocResource.id;
      //   newStockIn.id = newDocStockIn.id;

      //Creando recurso en redux
      //   dispatch(addStockIn(newStockIn));
      dispatch(addNewResource(activeResource));
      //   Creando el stockIn
      dispatch(startAddStockIn(true, newDocResource.id, activeResource));

      //borrando el active recurso
    dispatch(clearActiveResource());
      

      //Limpiar el alert
      setTimeout(() => {
        dispatch(setAlertMessage(null));
      }, 3000);
      //*----------------------------------------------------
    } catch (error) {
      console.error("Error al agregar el recurso:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startLoadingResources = () => {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true));

    try {
      const collectionRef = collection(FirebaseDB, "resources");

      let q = query(collectionRef, orderBy("name"));

      const querySnapshot = await getDocs(q);
      const resources = [];

      querySnapshot.forEach((doc) => {
        resources.push({ id: doc.id, ...doc.data() });
      });

      // En lugar de almacenar el snapshot completo, solo almacenamos los IDs
      dispatch(setResources(resources));
    } catch (error) {
      console.error("Error al cargar los recursos:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startSearchingResourceByName = (name) => {
  return async (dispatch, getState) => {
    const { activeResource } = getState().resource;

    const resourcesRef = collection(FirebaseDB, "resources"); // Referencia a la colección
    const q = query(resourcesRef, where("name", "==", name)); // Consulta por el campo "name"

    const querySnapshot = await getDocs(q); // Ejecuta la consulta

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; // Obtén el primer documento (debería haber solo uno)
      const resourceSearch = { ...doc.data(), id: doc.id }; // Obtiene los datos y agrega el id

      dispatch(
        setActiveResource({
          ...activeResource,
          unit: resourceSearch.unit,
          id: resourceSearch.id,
          idResource: resourceSearch.id,
        })
      );
    } else {
      console.log("No se encontró el documento con ese nombre.");
    }
  };
};

export const startSearchingInputAndOutputById = (id, isInput = true) => {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true)); // Activar estado de carga

    try {
      const { docSearch } = await getSearchInputAndOutput(id, isInput);
      dispatch(setActiveResource(docSearch));
    } catch (error) {
      console.error("Error al cargar el recurso:", error);
      dispatch(setErrorMessage(error.message));

      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startLoadingInputs = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const collectionRef = collection(FirebaseDB, "inputs");

      let q = query(collectionRef, orderBy("date", "asc"));

      const querySnapshot = await getDocs(q);
      const inputs = [];

      querySnapshot.forEach((doc) => {
        inputs.push({ id: doc.id, ...doc.data() });
      });

      // En lugar de almacenar el snapshot completo, solo almacenamos los IDs
      dispatch(setInputs(inputs));
    } catch (error) {
      console.error("Error al cargar los inputs:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startAddStockOut = (idResource) => {
  return async (dispatch, getState) => {
    const { activeResource, resources } = getState().resource;

    const newStockOut = {
      ...activeResource,
    };

    let resourceAuxDB;
    try {
      const { resourceDB, resourceUpdate } = await getResourceSearch(
        activeResource
      );

      resourceAuxDB = resourceDB; //Ayuda a utilizarlo mas adelante

      //Esto convierte los string en numeros, los resta y los vuelve a convertir en string
      const resourceQty = Number(resourceUpdate.quantity);
      const activeQty = Number(activeResource.quantity);

      if (resourceQty >= activeQty) {
        resourceUpdate.quantity = (resourceQty - activeQty).toString();
      } else {
        throw Error("Error: La cantidad a restar es mayor que la disponible.");
        // Puedes lanzar un error o manejarlo de otra forma según tu necesidad
      }

      const docRef = doc(FirebaseDB, `resources/${resourceUpdate.id}`);

      //quitarle el id al resource que vamos a actualizar
      delete resourceUpdate.id;

      await setDoc(docRef, resourceUpdate, { merge: true });

      //*------------Creacion del stockOut----------------------------
      //referiencia al documento buscado
      const newDocStockOut = doc(collection(FirebaseDB, `outputs`));

      //Agregando la unidad
      newStockOut.unit = resourceAuxDB.unit;

      //Agregando el id del recurso al que pertenecen
      newStockOut.idResource = resourceAuxDB.id;

      //Guardar el objeto en la referencia
      await setDoc(newDocStockOut, newStockOut);

      //Añadir el id de la ubicacion al stockIn
      newStockOut.id = newDocStockOut.id;

      //Creando input en redux
      dispatch(addNewStockOut(newStockOut));
      dispatch(startLoadingResources());

      //Limpiar el alert
      setTimeout(() => {
        dispatch(setAlertMessage(null));
      }, 3000);
      //*----------------------------------------------------
    } catch (error) {
      console.error("Error al crear la salida:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startLoadingOutputs = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const collectionRef = collection(FirebaseDB, "outputs");

      let q = query(collectionRef, orderBy("date", "asc"));

      const querySnapshot = await getDocs(q);
      const outputs = [];

      querySnapshot.forEach((doc) => {
        outputs.push({ id: doc.id, ...doc.data() });
      });

      // En lugar de almacenar el snapshot completo, solo almacenamos los IDs
      dispatch(setOutputs(outputs));
    } catch (error) {
      console.error("Error al cargar los outputs:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startLoadingInputsAndOutputsDate = (
  dateInit,
  dateFinish,
  collectionSave = "inputs"
) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    const dateInitTimestamp = new Date(dateInit);
    const dateFinishTimestamp = new Date(dateFinish);

    const q = query(
      collection(FirebaseDB, collectionSave),
      where("date", ">=", dateInit),
      where("date", "<=", dateFinish),
      orderBy("date", "asc")
    );

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setInputs(results));
    } catch (error) {
      console.error("Error al cargar los inputs:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};

export const startDeletingResources = (resourcesIds) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const batch = writeBatch(FirebaseDB); // Crear un batch de escritura en Firestore

      resourcesIds.forEach((id) => {
        const docRef = doc(collection(FirebaseDB, "resources"), id);
        batch.delete(docRef);
      });

      // await batch.commit(); // Ejecutar las eliminaciones en lote

      //* --------------Editar entradas y salidas para marcarlas colo eliminadas ---------------------

      for (const resourceId of resourcesIds) {
        // 🔹 Buscar documentos donde "resourceId" coincida
        const q = query(
          collection(FirebaseDB, "inputs"),
          where("idResource", "==", resourceId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnap) => {
            const docRef = doc(FirebaseDB, "inputs", docSnap.id);
            batch.update(docRef, { delete: true }); // 🔹 Marcar como eliminado
          });
        }
      }
      await batch.commit(); // 🔹 Ejecutar todas las actualizaciones y eliminaciones
    } catch (error) {
      console.error("Error al eliminar los recurso:", error);
      dispatch(setErrorMessage(error.message)); // Guardar el error en Redux para mostrarlo en la UI

      //Limpiar el error despues de 3 segundos
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 3000);
    } finally {
      //TODO: controlar las cargas
      dispatch(setIsLoading(false)); // Finalizar estado de carga
    }
  };
};
