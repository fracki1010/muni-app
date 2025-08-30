//Tiene como objetivo realizar cualquier interacion con
//la parte del auth de nuestro store

import { useDispatch, useSelector } from "react-redux";


import muniApi from "../apis/muniApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, setAlert, setError } from "../store/auth/authSlice";
import { getAxiosErrorMessage, getEnvVariable } from "../helpers";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  const startLogin = async ({ email, password }) => {
    //bloqueamos los botones por la verificacion
    dispatch(onChecking());


    try {
      //Enviando un post a la base de datos, y como 2do argumento
      //un body con los datos del email y el password
      //? Toda la parte asincrona sucede aqui
      const { data } = await muniApi.post("/auth", { email, password });



      //Guardar el token en el local storage
      localStorage.setItem("token", data.token);
      //Tambien creamos un set del tiempo en el que comenzo el token
      localStorage.setItem("token-init-date", new Date().getDate());

      //Ahora nos logueamos
      dispatch(onLogin({ name: data.name, uid: data.uid, email: data.user.email }));

      
      

    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));

      //Esto es para limpiar el error luego de mostrarlo
      //Espera 10 miliseg y lo borra
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100000);
    }
  };

//   const startRegister = async ({ name, email, password }) => {
//     //Bloqueamos los botones con el checking
//     dispatch(onChecking());

//     try {
//       //Enviando un post a la base de datos, y como 2do argumento
//       //un body con los datos del name, email y el password
//       //? Toda la parte asincrona sucede aqui
//       const { data } = await muniApi.post("/auth/new", {
//         name,
//         email,
//         password,
//       });

//       //Guardar el token en el local storage
//       localStorage.setItem("token", data.token);
//       //Tambien creamos un set del tiempo en el que comenzo el token
//       localStorage.setItem("token-init-date", new Date().getDate());

//       //Ahora nos logueamos con redux
//       dispatch(onLogin({ name: data.name, uid: data.uid }));
//     } catch (error) {
//       //Del error llegamos al mensaje de error de la BD de esta manera
//       //y preguntamos si viene el error, y sino enviamos espacio en blanco
//       dispatch(onLogout(error.response.data?.msg || ""));

//       //Esto es para limpiar el error luego de mostrarlo
//       //Espera 10 miliseg y lo borra
//       setTimeout(() => {
//         dispatch(clearErrorMessage());
//       }, 10);
//     }
//   };

  //Para validar el token
  const checkAuthToken = async () => {
    //? Esta funcion se llama en el (AppRouter.jsx)

    //Obtengo el token
    const token = localStorage.getItem("token");

    //Si no existe el token termina la sesion porque no esta authenticado
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await muniApi.get("/auth/renew");
      //Guardar el token en el local storage
      localStorage.setItem("token", data.token);
      //Tambien creamos un set del tiempo en el que comenzo el token
      localStorage.setItem("token-init-date", new Date().getDate());

      //Ahora nos logueamos con redux
      dispatch(onLogin({ name: data.name, uid: data.uid, email: data.user.email }));
    } catch (error) {
      //borra todo lo del localStorange
      localStorage.clear();
      //Lo quita de las sesion porque no esta logueado
      dispatch(onLogout());
    }
  };

  //Con esto hacemos el inicio del Logout
  const startLogout = async () => {
    //Borramos todo lo que contiene el localStorage
    localStorage.clear;

    //Me desgoleo en redux
    dispatch(onLogout());
  };


  const startChangePassword = async (oldPass, newPass) => {
    try {
      await muniApi.put("/auth/change-password", {
        currentPassword: oldPass,
        newPassword: newPass,
      });

      dispatch(setAlert('Se cambio la contraseña con exito'))

      setTimeout(() => {
        dispatch(setAlert(null));
      }, 3000);

    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error)
      dispatch(setError(errorMessage));

      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);



    }
  }

  return {
    //*Propiedades
    status,
    user,
    errorMessage,

    //*Metodos
    checkAuthToken,
    startLogin,
    startLogout,
    startChangePassword
    // startRegister,
  };
};
