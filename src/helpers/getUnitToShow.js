export const getDisplayUnit = (unit) => {
    const unitMap = {
      unidad: "u",
      caja: "cj",
      paquete: "paq",
      kilogramo: "kg",
      gramo: "g",
      litro: "L",
      mililitro: "mL",
      metro: "m",
      centimetro: "cm",
      pieza: "pz"
    };
  
    return unitMap[unit.toLowerCase()] || unit;
  }
  