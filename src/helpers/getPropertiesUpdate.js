import React from "react";

export const getPropertiesUpdate = (property = '') => {
  switch (property) {
    case "name":
      return "Nombre";
    case "unit":
      return "Unidad";
    case "description":
      return "Descripcion";
    default:
      return "No se reconoce";
  }
};
