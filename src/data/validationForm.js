export const validationForm = {
  name: [(value) => value.length >= 1, "El nombre del recurso es requerido"],
  date: [(value) => value?.length >= 1, "La fecha es requerida"],
  quantity: [(value) => value.length >= 1, "La cantidad es requerida"],
  unit: [(value) => value.length >= 1, "La unidad es requerida"],
  withdrawer: [
    (value) => value?.length >= 1,
    "El nombre de quien lo retira es requerido",
  ],
};
