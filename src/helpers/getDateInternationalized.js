export const getDateInternationalized = (date) => {
  const dateString = `${date.year}-${date.month
    .toString()
    .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`;
  return dateString;
};
