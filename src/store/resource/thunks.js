import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewMovement,
  addNewResource,
  addNewStockIn,
  addNewStockOut,
  clearActiveResource,
  setActiveMovement,
  setActiveResource,
  setAlertMessage,
  setErrorMessage,
  setIsLoading,
  setMovements,
  setResources,
} from "./resourceSlice";
import { getResourceSearch } from "../../helpers/getResourceSearch";
// import { getSearchInputAndOutput } from "../../helpers/getSearchInputAndOutput";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { getActiveResources } from "../../helpers/getActiveResources";
import { getResourceById, getResourcesSearchByName, getSearchMovement } from "../../helpers";

export const startAddInput = () => {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true)); // Inicia la carga

    try {
      const { activeMovement } = getState().resource;
      if (!activeMovement) throw new Error("No hay un movimiento activo.");

      // Obtener referencia del recurso relacionado desde caché primero
      const { resourceDocRef, resourceSearch } = await getResourcesSearchByName(
        activeMovement.name,
        true
      );
      if (!resourceDocRef || !resourceSearch)
        throw new Error("No se encontró el recurso.");

      // Crear referencia al nuevo documento en "movements"
      const movementRef = doc(collection(FirebaseDB, "movements"));
      const newInput = { ...activeMovement, idResource: resourceSearch.id };
      delete newInput.name; //Eliminamos el nombre para que no se guarde
      // Actualizar cantidad del recurso
      resourceSearch.quantity = `${
        +resourceSearch.quantity + +newInput.quantity
      }`;
      delete resourceSearch.id; // Eliminar ID antes de actualizar el documento

      // 🔹 Usamos batch para reducir escrituras
      const batch = writeBatch(FirebaseDB);
      batch.set(movementRef, newInput); // Guardar nuevo movimiento
      batch.set(resourceDocRef, resourceSearch, { merge: true }); // Actualizar recurso

      await batch.commit(); // Ejecutar batch antes de actualizar el array

      // ✅ Actualizar el array de IDs en recordHistory
      await updateDoc(resourceDocRef, {
        recordHistory: arrayUnion(movementRef.id), // Agregar ID al array sin sobrescribir
      });

      // Actualizar Redux
      dispatch(addNewMovement(newInput));
      dispatch(startLoadingResources());

      // Limpiar alertas
      dispatch(setAlertMessage("Movimiento registrado correctamente"));
      setTimeout(() => dispatch(setAlertMessage(null)), 3000);
    } catch (error) {
      console.error("Error al crear la entrada:", error);
      dispatch(setErrorMessage(error.message));
      setTimeout(() => dispatch(setErrorMessage(null)), 3000);
    } finally {
      dispatch(setIsLoading(false)); // Finalizar carga
    }
  };
};

export const startAddStockIn = (isNewResource, idResource, resourceSend) => {
  return async (dispatch, getState) => {
    const { activeResource } = getState().resource;

    const newStockIn = {
      ...resourceSend,
    };

    let resourceAuxDB;
    try {
      if (!isNewResource) {
        const { resourceDB, resourceUpdate } = await getResourceSearch(
          idResource
        );

        resourceAuxDB = resourceDB; //Este aux es para mas adelante porque se borra el id

        //Esto convierte los string en numeros, los suma y los vuelve a convertir en string
        resourceUpdate.quantity = (
          Number(resourceUpdate.quantity) + Number(activeResource.quantity)
        ).toString();

        const docRef = doc(FirebaseDB, `resources/${idResource}`);

        //quitarle el id al resource que vamos a actualizar
        delete resourceUpdate.id;

        await setDoc(docRef, resourceUpdate, { merge: true });
      }
      //*------------Creacion del stockIn----------------------------
      //referiencia al documento buscado
      const newDocStockIn = doc(collection(FirebaseDB, `movements`));

      //Agregando la unidad
      newStockIn.unit = isNewResource ? resourceSend.unit : resourceAuxDB.unit;

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
      dispatch(addNewResource(activeResource));

      //   Creando el stockIn
      // dispatch(startAddStockIn(true, newDocResource.id, activeResource));

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
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const resources = await getActiveResources();

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


//!ELIMINAR
export const startSearchingResourceById = (id) => {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true));

    try {
      const docRef = doc(FirebaseDB, "resources", id); // Referencia al documento
      const docSnap = await getDoc(docRef); // Obtener el documento

      let docSearch;

      if (docSnap.exists()) {
        docSearch = { ...docSnap.data(), id: docSnap.id }; // Datos del recurso

        dispatch(setActiveResource(docSearch));
      } else {
        throw Error("No se encontró el documento con ese ID.");
      }
    } catch (error) {
      console.error("Error al buscar el recurso:", error);
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
    const resourcesRef = collection(FirebaseDB, "resources"); // Referencia a la colección
    const q = query(resourcesRef, where("name", "==", name)); // Consulta por el campo "name"

    const querySnapshot = await getDocs(q); // Ejecuta la consulta

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; // Obtén el primer documento (debería haber solo uno)
      const resourceSearch = { ...doc.data(), id: doc.id }; // Obtiene los datos y agrega el id

      dispatch(
        setActiveResource({
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

export const startLoadMovementsWithResources = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      // 🔹 1. Obtener todos los movimientos
      const movementsRef = collection(FirebaseDB, "movements");
      const movementsSnap = await getDocs(movementsRef);

      if (movementsSnap.empty)
        throw new Error("No hay movimientos registrados.");

      let movementsData = movementsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔹 2. Extraer los resourceId únicos
      const resourceIds = [
        ...new Set(movementsData.map((mov) => mov.idResource).filter(Boolean)),
      ];

      // 🔹 3. Si no hay recursos, solo guardamos los movimientos
      if (resourceIds.length === 0) {
        dispatch(setMovements(movementsData));
        return;
      }

      // 🔹 4. Obtener solo `unit` y `name` de los recursos en una sola consulta
      const resourcesRef = collection(FirebaseDB, "resources");
      const resourcesQuery = query(
        resourcesRef,
        where("__name__", "in", resourceIds)
      );
      const resourcesSnap = await getDocs(resourcesQuery);

      // 🔹 5. Crear un mapa con solo `name` y `unit`
      const resourcesMap = {};
      resourcesSnap.docs.forEach((doc) => {
        const { name, unit } = doc.data(); // Solo tomamos `name` y `unit`
        resourcesMap[doc.id] = { name, unit };
      });

      // 🔹 6. Fusionar movimientos con `resource.name` y `resource.unit`
      movementsData = movementsData.map((mov) => ({
        ...mov,
        resource: resourcesMap[mov.idResource] || {
          name: "Desconocido",
          unit: "N/A",
        },
      }));

      console.log(movementsData);

      // 🔹 7. Guardar en Redux
      dispatch(setMovements(movementsData));
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
      dispatch(setErrorMessage(error.message));
    } finally {
      dispatch(setIsLoading(false));
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
      dispatch(setMovements(outputs));
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

      dispatch(setMovements(results));
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

export const startSearchingMovementById = (id) => {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true)); // Activar estado de carga

    try {
      const { docSearch } = await getSearchMovement(id);
      dispatch(setActiveMovement(docSearch));
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

export const startLoadMovementsOfResource = (id) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {

       // 1. Obtener el documento de resource
       const { resourceDB } = await getResourceById(id);


       const recordHistory = resourceDB.recordHistory || [];
 
       if (recordHistory.length === 0) {
         return [];
       }
 
       // 2. Agrupar en bloques de máximo 10 IDs (límite de Firestore)
       const chunkedIds = [];
       for (let i = 0; i < recordHistory.length; i += 10) {
         chunkedIds.push(recordHistory.slice(i, i + 10));
       }
 
       // 3. Hacer las mínimas peticiones posibles a Firestore
       const movements = [];
 
       for (const chunk of chunkedIds) {
         const q = query(collection(FirebaseDB, 'movements'), where('__name__', 'in', chunk));
         const querySnapshot = await getDocs(q);
 
         querySnapshot.forEach(doc => {
           movements.push({
             id: doc.id,
             ...doc.data()
           });
         });
       }
       
       
       dispatch(setMovements(movements));

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
