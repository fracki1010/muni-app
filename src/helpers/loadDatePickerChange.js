//Esto setea la fecha para traer elementos

import { useDispatch } from "react-redux";
import { startLoadingInputsDate } from "../store/resource/thunks";
import { getDateInternationalized } from "./getDateInternationalized.JS";

export const loadDatePickerChange = (e, collection) => {
  const dispatch = useDispatch();
  const start = getDateInternationalized(e.start);
  const end = getDateInternationalized(e.end);

  dispatch(startLoadingInputsDate(start, end, collection));
};
