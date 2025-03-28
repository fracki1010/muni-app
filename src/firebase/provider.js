import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from "./config";
import { getFirebaseErrorMessage } from "../helpers/getFirebaseErrorMessage";


//TODO: crear logIn y signIn con google 
const googleProvider = new GoogleAuthProvider();

//!Login con google
export const loginWithGoogle = async ({ email, password }) => {

    try{

        //Esta funcion la llame de firebase/auth y sirve para loguarse
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user
        
        return {
            ok: true,
            uid, photoURL, displayName,
        }


    }catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


export const loginWithEmailPassword = async ({ email, password}) => {

    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, displayName, photoURL } = resp.user;

        return {
            ok: true,
            uid, displayName, photoURL,
        }

    }catch (error) {
        console.log({error});
        
        return {
             ok: false, 
            //  errorMessage: error.message 
            errorMessage: getFirebaseErrorMessage(error.code),
        }
    }
}


export const logoutFirebase = async () => {

    //Esto es para cerrar google y desloguearse
    return await FirebaseAuth.signOut();
}