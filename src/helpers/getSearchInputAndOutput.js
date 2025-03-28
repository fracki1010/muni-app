import { doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const getSearchInputAndOutput = async (id, isInput = true) => {
  const docRef = doc(FirebaseDB, isInput ? "inputs" : "outputs", id); // Referencia al documento
  const docSnap = await getDoc(docRef); // Obtener el documento

  let docSearch;

  if (docSnap.exists()) {
    docSearch = { ...docSnap.data(), id: docSnap.id }; // Datos del recurso
  } else {
    throw Error("No se encontró el documento con ese ID.");
  }
  return { docSearch };
};
