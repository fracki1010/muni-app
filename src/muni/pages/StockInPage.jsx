import React, { useEffect, useState } from "react";
import { Button, DateRangePicker, Spinner, useDisclosure } from "@heroui/react";
import { TableListComponent } from "../../components/TableListComponent";
import { Add } from "@mui/icons-material";
import { DrawerInputComponent } from "../../components/DrawerInputComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoadingInputs,
  startLoadingInputsAndOutputsDate,
  startLoadingResources,
} from "../../store/resource/thunks";
import { DrawerInfoComponent } from "../../components/DrawerInfoComponent";
import { parseDate } from "@internationalized/date";
import { format, subMonths } from "date-fns";
import { isMobile } from "../../helpers/isMobile";
import { LoaderDashboard } from "../../ui/LoaderDashboard";

export const StockInPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDrawerInfo,
    onOpen: onOpenDrawerInfo,
    onOpenChange: onOpenChangeDrawerInfo,
  } = useDisclosure();

  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");

  const onDatePickerChange = (e) => {
    const start = getDateInternationalized(e.start);
    const end = getDateInternationalized(e.end);

    dispatch(startLoadingInputsAndOutputsDate(start, end, is));
  };

  const dispatch = useDispatch();
  const { inputs, isLoading } = useSelector((state) => state.resource);

  useEffect(() => {
    dispatch(startLoadingInputs());
    dispatch(startLoadingResources()); //se llama para que se cargen los recursos tambien, sino no aparecen
  }, []);

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
          <div className="flex gap-3 w-[95%] mx-auto justify-between h-[80vh] md:h-[70vh]">
            {/* {isLoading && <Spinner/>} */}
            <TableListComponent
              array={inputs}
              is="inputs"
              onOpenDrawerInfo={onOpenDrawerInfo}
              />
          </div>
        </div>
      </div>
      <DrawerInputComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Entrada"
      />
      <DrawerInfoComponent
        isOpen={isOpenDrawerInfo}
        onOpenChange={onOpenChangeDrawerInfo}
        title='Detalles de la Entrada'
      />
    </>
  );
};
