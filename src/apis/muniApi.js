
import axios from "axios";
import { getEnvVariable } from "../helpers/helpersNew/getEnvVariable";

//Desestructurar variable de entorno
const { VITE_API_URL } = getEnvVariable();

const muniApi = axios.create({
    baseURL: VITE_API_URL
});


//*Interceptores 
//Estos interseptan peticiones del backend
muniApi.interceptors.request.use( config => { 
//Antes que se haga la solicitudse usa el interseptor

//*Cualquier peticion que se haga del muniApi, va
//*a llegar este token en el header
    config.headers = {
        //A este lo extraemos del localStorage que guardamos antes
        'x-token': localStorage.getItem('token'),
        //Esto es por si envian mas headers y no meterme
        ...config.headers
    }
    return config
})


export default muniApi;