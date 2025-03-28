import { loginWithEmailPassword, logoutFirebase } from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials()); 
                                                                                                                                                              
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {

        //Esto bloquea el boton de login
        dispatch(checkingCredentials());

        //Llama a la funcion que lo va a loguear en google firestone
        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({ email, password });


        //Si esta mal el se desloguea y muestra el error
        //TODO: no se si esta bien
        if(!ok) return dispatch( logout({errorMessage}));
        

        //Con esto se combinan y unen con el estado de authSlice
        dispatch( login({ uid, displayName, email, photoURL }));
    }
}

//* Con esta funcion nos deslogueamos
export const startLogout = () => {
    return async (dispatch) => {

        //con esto cerramos sesion y lo sacamos de la pagina para
        //tener homogeneidad de todo
        await logoutFirebase();

        //llamando al logout que esta dentro del authSlice
        dispatch( logout() );

    }
}