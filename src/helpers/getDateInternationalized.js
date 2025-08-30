export const getDateInternationalized = (date) => {
  const nativeDate = date.toDate(); // Convierte el objeto a Date real en tu zona horaria

  const year = nativeDate.getFullYear();
  const month = String(nativeDate.getMonth() + 1).padStart(2, '0');
  const day = String(nativeDate.getDate()).padStart(2, '0');
  const hour = String(nativeDate.getHours()).padStart(2, '0');
  const minute = String(nativeDate.getMinutes()).padStart(2, '0');
  const second = String(nativeDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};
