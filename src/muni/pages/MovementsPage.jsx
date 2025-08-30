import React, { useEffect, useState } from "react";
import { addToast, Button, DateRangePicker, Spinner, useDisclosure } from "@heroui/react";
import { TableListComponent } from "../../components/TableListComponent";
import { Add, CheckCircle, Error } from "@mui/icons-material";
import { DrawerInputComponent } from "../../components/DrawerInputComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoadingInputsAndOutputsDate,
  startLoadingResources,
  startLoadMovementsOfResource,
  startLoadMovementsWithResources,
} from "../../store/resource/thunks";
import { DrawerInfoComponent } from "../../components/DrawerInfoComponent";
import { parseDate } from "@internationalized/date";
import { format, subMonths } from "date-fns";
import { useIsMobile } from "../../hooks/useIsMobile";
import { LoaderDashboard } from "../../ui/LoaderDashboard";
import { TableMovementsComponents } from "../../components/TableMovementsComponents";
import { DrawerInputMovement } from "../../components/DrawerInputMovement";
import { useMuniStore } from "../../hooks/useMuniStore";
import { getDateInternationalized } from "../../helpers";

export const MovementsPage = () => {

  const {isMobile} = useIsMobile();

  const { startLoadingMovements, startLoadingResourcesLite, startLoadingWorkersNames } = useMuniStore();
  const { alertMessage, errorMessage } = useSelector((state) => state.resource);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDrawerInfo,
    onOpen: onOpenDrawerInfo,
    onOpenChange: onOpenChangeDrawerInfo,
  } = useDisclosure();

  //Alerta a mensajes de exito
  useEffect(() => {
    alertMessage &&
      addToast({
        title: alertMessage,
        icon: <CheckCircle />,
        variant: "solid",
        color: "secondary",
      });
  }, [alertMessage]);


  //Alerta a mensajes de error
  useEffect(() => {
    errorMessage &&
      addToast({
        title: errorMessage,
        icon: <Error />,
        variant: "solid",
        color: "danger",
      });
  }, [errorMessage]);


  const endDate = format(new Date(), "yyyy-MM-dd");
  const startDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");

  const onDatePickerChange = (e) => {
    const start = getDateInternationalized(e.start);
    const end = getDateInternationalized(e.end);

    // dispatch(startLoadingInputsAndOutputsDate(start, end, is));
    startLoadingMovements(start, end);
  };

  useEffect(() => {
    // dispatch(startLoadMovementsWithResources());
    // dispatch(startLoadingResources()); //se llama para que se cargen los recursos tambien, sino no aparecen
    startLoadingMovements();
    startLoadingResourcesLite();
    startLoadingWorkersNames();
  }, [alertMessage]);

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
              aria-label="datePicket"
              onChange={onDatePickerChange}
            />
            <Button
              variant="solid"
              size="md"
              isIconOnly={isMobile}
              className=" mr-2"
              color="primary"
              onPress={onOpen}
            >
              <p className="hidden md:flex">Agregar Movimiento</p>
              <div className="md:hidden">
                <Add />
              </div>
            </Button>
          </div>

          {/* Segunda fila con dos columnas */}
          <div className="flex gap-3 w-[95%] mx-auto justify-between h-[80vh] md:h-[70vh]">
            <TableMovementsComponents onOpen={onOpenDrawerInfo} />
          </div>
        </div>
      </div>

      <DrawerInputMovement isOpen={isOpen} onOpenChange={onOpenChange} />
      {/* <DrawerInputComponent
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Entrada"
          /> */}
      <DrawerInfoComponent
            isOpen={isOpenDrawerInfo}
            onOpenChange={onOpenChangeDrawerInfo}
            title='Detalles del movimiento'
          />
    </>
  );
};
