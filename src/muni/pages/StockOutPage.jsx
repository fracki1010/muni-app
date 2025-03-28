import React, { useEffect, useState } from "react";
import {
  addToast,
  Button,
  DateRangePicker,
  useDisclosure,
} from "@heroui/react";
import { TableListComponent } from "../../components/TableListComponent";
import { Add, ArrowBackIosNewOutlined, Error, Search } from "@mui/icons-material";
import { SearchComponent } from "../../components/SearchComponent";
import { DrawerInputComponent } from "../../components/DrawerInputComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoadingInputsAndOutputsDate,
  startLoadingOutputs,
  startLoadingResources,
} from "../../store/resource/thunks";
import { DrawerInfoComponent } from "../../components/DrawerInfoComponent";
import { parseDate } from "@internationalized/date";
import { format, subMonths } from "date-fns";
import { getDateInternationalized } from "../../helpers/getDateInternationalized.JS";
import { isMobile } from "../../helpers/isMobile";

export const StockOutPage = () => {
  const dispatch = useDispatch();
  const { outputs, alertMessage, errorMessage } = useSelector(
    (state) => state.resource
  );
  const {
    isOpen: isOpenDrawerInfo,
    onOpen: onOpenDrawerInfo,
    onOpenChange: onOpenChangeDrawerInfo,
  } = useDisclosure();

  useEffect(() => {
    dispatch(startLoadingOutputs());
    dispatch(startLoadingResources());
  }, []);

  useEffect(() => {
    alertMessage ||
      (errorMessage &&
        addToast({
          title: alertMessage || errorMessage,
          icon: !!alertMessage ? <CheckCircle /> : <Error />,
          variant: "solid",
          color: !!alertMessage ? "secondary" : "danger",
        }));
  }, [alertMessage, errorMessage]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");

  const onDatePickerChange = (e) => {
    const start = getDateInternationalized(e.start);
    const end = getDateInternationalized(e.end);

    dispatch(startLoadingInputsAndOutputsDate(start, end, is));
  };

  return (
    <>
      <div className="w-fit mx-auto mt-2 md:w-[80%]">
        <div className="flex flex-col gap-3 ">
          {/* Primera fila */}
          <div className="shadow-2xl rounded-lg p-2 w-[95%] mx-auto flex justify-between items-center bg-content1">
            <DateRangePicker
              isRequired
              className=" w-auto shadow-lg"
              defaultValue={{
                start: parseDate(startDate),
                end: parseDate(endDate),
              }}
              label="buscar desde - hasta"
              aria-label="datePicket"
              onChange={onDatePickerChange}
            />
            <Button
              variant="solid"
              size="lg"
              isIconOnly={isMobile()}
              className=" mr-2"
              color="primary"
              onPress={onOpen}
            >
              <p className="hidden md:flex">Agregar entrada</p>
              <div className="md:hidden">
                <Add />
              </div>
            </Button>
          </div>

          {/* Segunda fila con dos columnas */}
          <div className="flex gap-3 shadow-2xl rounded-lg  w-[95%] mx-auto justify-between h-[80vh] md:h-[70vh]">
            {/* <div className="flex-1 shadow-2xl rounded-lg p-4 bg-content1">
            <Apps />
            </div> */}

            <TableListComponent
              array={outputs}
              is="outputs"
              onOpenDrawerInfo={onOpenDrawerInfo}
            />
          </div>
        </div>
      </div>
      <DrawerInputComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isOut={true}
        title="Salida"
      />
      <DrawerInfoComponent
        isOpen={isOpenDrawerInfo}
        onOpenChange={onOpenChangeDrawerInfo}
        isOut={true}
        title='Detalles de la Salida'
      />
    </>
  );
};
