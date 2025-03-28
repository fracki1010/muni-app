import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";


export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      
        onAuthStateChanged( FirebaseAuth, async (user) =>{
            //Este es la activacion de un observador que
            //va a estar viendo mi status y saber si estoy registrado

            if( !user ) return dispatch( logout() );

            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) );
        } )
        
    }, [])
    

  return status;
}
