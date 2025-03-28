import { parseDate } from "@internationalized/date";
import { useEffect, useMemo, useState } from "react";
import { getDateInternationalized } from "../helpers/getDateInternationalized.JS";
import { getParseInternationalizedDate } from "../helpers/getParseInternationalizedDate";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChangeAutocomplete = (event, name) => {
    setFormState({ ...formState, [name]: event });
  };

  const onInputChange = (event) => {
    if (event?.target) {
      // Manejar inputs normales
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
    } else if (event?.year && event?.month && event?.day) {
      console.log("entra");
      // Manejar selección de fecha

      setFormState({
        ...formState,
        date: getDateInternationalized(event),
      });
    } else if (typeof event == "string") {
      // Manejar selección de fecha

      setFormState({
        ...formState,
        date: {
          id: "internationalized",
          dateInt: getParseInternationalizedDate(event),
          dateShow: event,
        },
      });
      console.log("entro");
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    onInputChangeAutocomplete,
    
    ...formValidation,
    isFormValid,
  };
};
