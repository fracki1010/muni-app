export const unitEnum = Object.freeze({
  UNIDAD: "unidad",
  CAJA: "caja",
  PAQUETE: "paquete",
  KILOGRAMO: "kilogramo",
  GRAMO: "gramo",
  LITRO: "litro",
  MILILITRO: "mililitro",
  METRO: "metro",
  CENTIMETRO: "centimetro",
  PIEZA: "pieza",
});

export const unitObj = Object.entries(unitEnum).map(([value]) => ({ value }));

