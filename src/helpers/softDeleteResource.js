import { doc, updateDoc } from "firebase/firestore";  
import { FirebaseDB } from "../firebase/config";
 

export const softDeleteResource = async (id) => {  
    const recursoRef = doc(FirebaseDB, "resources", id);  
    await updateDoc(recursoRef, { status: "inactive" });  
};