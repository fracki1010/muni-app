export const getAxiosErrorMessage = (error) => {
  console.log(error);

  // Si el servidor respondió con status >= 400
  if (error.response) {
    // Si el backend te devuelve un objeto con msg
    if (error.response.data?.msg) {
      return error.response.data.msg;
    }

    // Si el backend te devuelve un objeto con error
    if (error.response.data?.msg) {
      return error.response.data.msg;
    }

    // Si devuelve un array de errores
    if (error.response.data?.errors) {
      
      return Object.values(error.response.data.errors)[0].msg;
    }

    // Si no sabés qué vino
    return `Error ${error.response.status}: ${error.response.statusText}`;
  }

  // Si no hubo respuesta (por ejemplo, timeout, CORS, etc.)
  if (error.request) {
    return "No se recibió respuesta del servidor.";
  }

  // Otros errores al configurar la request
  return error.message || "Error desconocido al hacer la petición.";
};
