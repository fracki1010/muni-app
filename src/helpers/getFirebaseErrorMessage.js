export const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "El formato del correo es inválido.";
    case "auth/user-not-found":
      return "No existe un usuario con ese correo.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    case "auth/email-already-in-use":
      return "El correo ya está en uso por otra cuenta.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil.";
    case "auth/network-request-failed":
      return "Error de conexión. Verifica tu internet.";
    case "auth/invalid-credential": // Manejar ambos casos igual
      return "Correo o contraseña incorrectos.";
    default:
      return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }
};
