import { FirebaseDB } from "../firebase/config";
import { collection, getDocs, query, where, doc, getDocsFromCache } from "firebase/firestore";

export const getResourcesSearchByName = async (name, useCache = false) => {
  const resourcesRef = collection(FirebaseDB, "resources"); // Referencia a la colección
  const q = query(resourcesRef, where("name", "==", name)); // Consulta por el campo "name"

  let querySnapshot;
  if (useCache) {
    try {
      querySnapshot = await getDocsFromCache(q); // Intenta obtener datos desde caché
    } catch {
      querySnapshot = await getDocs(q); // Si falla, obtiene desde Firestore
    }
  } else {
    querySnapshot = await getDocs(q); // Obtiene desde Firestore
  }

  if (querySnapshot.empty) {
    throw new Error(`No se encontró un recurso con el nombre: ${name}`);
  }

  const docSnap = querySnapshot.docs[0]; // Obtiene el primer documento (debería haber solo uno)
  const resourceSearch = { ...docSnap.data(), id: docSnap.id }; // Obtiene los datos y agrega el ID
  const resourceDocRef = doc(FirebaseDB, "resources", docSnap.id); // Referencia al documento correcto

  return { resourceDocRef, resourceSearch }; // Devuelve la referencia al DOCUMENTO, no a la colección
};
