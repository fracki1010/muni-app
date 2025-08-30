import React, { useEffect, useState } from "react";
import { Button, useDisclosure, addToast } from "@heroui/react";
import { TableListComponent } from "../../components/TableListComponent";
import {
  Apps,
  ArrowBackIosNewOutlined,
  CheckCircle,
  Search,
} from "@mui/icons-material";
import { SearchComponent } from "../../components/SearchComponent";
import { DrawerInputComponent } from "../../components/DrawerInputComponent";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingResources } from "../../store/resource/thunks";
import { DrawerInfoComponent } from "../../components/DrawerInfoComponent";
import {
  DrawerInputResourceComponents,
  TableResourcesComponents,
} from "../../components";
import { DrawerEditResourceComponent } from "../../components/DrawerEditResourceComponent";
import { useMuniStore } from "../../hooks/useMuniStore";

export const ResourcesPage = () => {

  const { startLoadingResourcesLite } = useMuniStore();

  const [searchActive, setSearchActive] = useState(false);
  const {
    isOpen: isOpenDrawerInfo,
    onOpen: onOpenDrawerInfo,
    onOpenChange: onOpenChangeDrawerInfo,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { alertMessage, errorMessage } = useSelector((state) => state.resource);

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
    startLoadingResourcesLite();
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
                  Agregar recurso
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
            <TableResourcesComponents onOpenDrawer={onOpenDrawerInfo} />
          </div>
        </div>
      </div>
      <DrawerInputResourceComponents
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

    </>
  );
};
