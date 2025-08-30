import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const getActiveResources = async () => {
  const collectionRef = collection(FirebaseDB, "resources");
  const q = query(
    collectionRef,
    where("status", "==", "active"),
  );
  const querySnapshot = await getDocs(q);
  const resources = [];
  querySnapshot.forEach((doc) => {
    resources.push({ id: doc.id, ...doc.data() });
  });

  return resources;
};
