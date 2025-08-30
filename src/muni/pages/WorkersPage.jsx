import React, { useEffect, useState } from "react";
import { Button, useDisclosure, addToast } from "@heroui/react";
import {
  ArrowBackIosNewOutlined,
  CheckCircle,
  Search,
} from "@mui/icons-material";
import { SearchComponent } from "../../components/SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMuniStore } from "../../hooks/useMuniStore";
import { TableWorkersComponents } from "../../components/TableWorkersComponents";
import { DrawerInputWorkerComponents } from "../../components/DrawerInputWorkerComponents";

export const WorkersPage = () => {

  const { startLoadingWorker } = useMuniStore();

  const [searchActive, setSearchActive] = useState(false);
  const {
    isOpen: isOpenDrawerInfo,
    onOpen: onOpenDrawerInfo,
    onOpenChange: onOpenChangeDrawerInfo,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { alertMessage, errorMessage } = useSelector((state) => state.worker);

  const onOpenDrawerInfoButton = () => {
    onOpenDrawerInfo;
  };

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

  useEffect(() => {
    // dispatch(startLoadingResources());
    startLoadingWorker(1, 10);
  }, []);

  return (
    <>
      <div className="w-fit mx-auto mt-2 md:w-[80%]">
        <div className="flex flex-col gap-3 ">
          {/* Primera fila */}
          <div className="shadow-2xl rounded-lg p-2 w-[95%] mx-auto flex justify-between items-center bg-content1">
            {searchActive ? (
              <>
                <Button
                  variant="light"
                  isIconOnly
                  onClick={() => setSearchActive(false)}
                >
                  <ArrowBackIosNewOutlined className="text-gray-700" />
                </Button>
                <SearchComponent />
              </>
            ) : (
              <>
                <div className="hidden md:flex">
                  <SearchComponent />
                </div>
                <Button
                  variant="light"
                  isIconOnly
                  onClick={() => setSearchActive(true)}
                  className="md:hidden"
                >
                  <Search fontSize="medium" className=" text-slate-50" />
                </Button>
                <Button variant="solid" color="primary" onPress={onOpen}>
                  Agregar obrero
                </Button>
              </>
            )}
          </div>

          {/* Segunda fila con dos columnas */}
          <div className="flex gap-3 shadow-2xl rounded-lg   w-[95%] mx-auto justify-between max-h-[80vh] h-auto md:max-h-[70vh]">
            {/* <div className="flex-1 shadow-2xl rounded-lg p-4 bg-content1">
            <Apps />
            </div> */}

            {/* <TableListComponent
              array={filterResources}
              is="resources"
              onOpenDrawerInfo={onOpenDrawerInfo}
            /> */}
            <TableWorkersComponents onOpenDrawer={onOpenDrawerInfo} />
          </div>
        </div>
      </div>
      <DrawerInputWorkerComponents
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

    </>
  );
};
