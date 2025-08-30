import { doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const getResourceById = async (id) => {
  const docRef = doc(FirebaseDB, "resources", id); // Referencia al documento
  const docSnap = await getDoc(docRef); // Obtener el documento

  let resourceDB;

  if (docSnap.exists()) {
    resourceDB = { ...docSnap.data(), id: docSnap.id }; // Datos del recurso
  } else {
    throw Error("No se encontró el documento con ese ID.");
  }
  return { resourceDB };
};
