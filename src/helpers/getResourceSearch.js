import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { FirebaseDB } from "../firebase/config";

export const getResourceSearch = async (activeResource) => {


  let resourceUpdate;
  let resourceDB;
  const resourcesRef = collection(FirebaseDB, "resources"); // Referencia a la colección
  const q = query(resourcesRef, where("name", "==", activeResource.name)); // Consulta por el campo "name"

  const querySnapshot = await getDocs(q); // Ejecuta la consulta

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Obtén el primer documento (debería haber solo uno)
    resourceUpdate = { ...doc.data(), id: doc.id }; // Obtiene los datos y agrega el id
    //Esto es para que quede guardado para el input
    resourceDB = { ...doc.data(), id: doc.id };
  } else {
    throw Error("No hay querySnapshot");
  }
  return {
    resourceUpdate,
    resourceDB,
  };
};
