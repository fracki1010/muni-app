import { doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const getSearchMovement = async (id) => {
  const docRef = doc(FirebaseDB, 'movements', id); // Referencia al documento
  const docSnap = await getDoc(docRef); // Obtener el documento

  let docSearch;

  if (docSnap.exists()) {
    docSearch = { ...docSnap.data(), id: docSnap.id }; // Datos del recurso
  } else {
    throw Error("No se encontró el documento con ese ID.");
  }
  return { docSearch };
};
