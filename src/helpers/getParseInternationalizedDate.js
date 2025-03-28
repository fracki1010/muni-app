export const getParseInternationalizedDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Restamos 1 al mes porque Date usa índices de 0 a 11
};
