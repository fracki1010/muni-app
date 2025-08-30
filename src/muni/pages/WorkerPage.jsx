import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  startLoadMovementsOfResource,
  startSearchingResourceById,
} from "../../store/resource/thunks";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
  User,
} from "@heroui/react";
import { Edit } from "@mui/icons-material";
import { formatLongDate } from "../../helpers";
import { TableInfoComponent } from "../../components/TableInfoComponent";
import { DrawerInfoComponent } from "../../components";
import { useMuniStore } from "../../hooks/useMuniStore";
import { DrawerInfoUpdateComponent } from "../../components/DrawerInfoUpdateComponent";
import { DrawerEditResourceComponent } from "../../components/DrawerEditResourceComponent";
import { TableInfoWorkerComponent } from "../../components/TableInfoWorkerComponents";
import { TableMovementsWorkerComponents } from "../../components/TableMovementsWorkerComponents";

export const WorkerPage = () => {
  const {
    startLoadingWorkerByIdWithPagination,
    startLoadingMovementOfWorkerById,
  } = useMuniStore();
  const { activeWorker, isLoading } = useSelector((state) => state.worker);
  const {
    isOpen: isOpenDrawerMovement,
    onOpen: onOpenDrawerMovement,
    onOpenChange: onOpenChangeDrawerMovement,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawerUpdate,
    onOpen: onOpenDrawerUpdate,
    onOpenChange: onOpenChangeDrawerUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawerEdit,
    onOpen: onOpenDrawerEdit,
    onOpenChange: onOpenChangeDrawerEdit,
  } = useDisclosure();

  const { id } = useParams();

  let tabs = useMemo(
    () => [
      {
        id: "resources",
        label: "Recursos",
        content: <TableInfoWorkerComponent />,
        //   content: "hola",
      },
      {
        id: "workers-movements",
        label: "Movimientos",
        content: (
          <TableMovementsWorkerComponents onOpen={onOpenDrawerUpdate} />
        ),
      },
    ],
    [onOpenDrawerUpdate]
  );

  useEffect(() => {
    // dispatch(startLoadMovementsOfResource(id));
    startLoadingWorkerByIdWithPagination(id, 1, 10);
    startLoadingMovementOfWorkerById(id, 1, 10);
  }, []);

  if (isLoading) {
    return (
      <div className=" flex w-full h-[80vh] justify-center items-center ">
        <Spinner variant="spinner" />
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto mt-2 md:w-[90%]">
      <div className="p-2 w-[95%] mx-auto h-auto flex flex-wrap justify-between items-start gap-4">
        <div className="shadow-2xl rounded-lg bg-content1 p-4 px-6  overflow-auto">
          {/* {activeResource.delete && (
            <Alert
              className="mt-14 mb-6"
              variant="solid"
              color="danger"
              title="Este recurso fue eliminado"
            />
          )} */}
          {/* <div className="flex justify-between">
            <h2 className="text-2xl text-primary font-bold mb-4">
              Detalles del recurso
            </h2>
            <Button variant="light" isIconOnly onPress={onOpenChangeDrawerEdit}>
              <Edit />
            </Button>
          </div> */}

          {/* <div className="mb-4">
            <strong className="block text-primary font-medium">Nombre:</strong>
            <p className="mt-1 text-lg text-white">{activeResource?.name}</p>
          </div> */}

          {/* <div className="mb-4">
            <strong className="block text-primary font-medium">
              Cantidad:
            </strong>
            <p className="mt-1 text-lg text-white">
              {activeResource?.quantity}
            </p>
          </div> */}

          {/* <div className="mb-4">
            <strong className="block text-primary font-medium">Unidad:</strong>
            <p className="mt-1 text-lg text-white">{activeResource?.unit}</p>
          </div> */}
          {/* <div className="mb-4">
            <strong className="block text-primary font-medium">
              Fecha de Creación:
            </strong>
            <p className="mt-1 text-lg text-white">
              {formatLongDate(activeResource?.dateCreation)}
            </p>
          </div> */}

          {/* <div>
            <strong className="block text-primary font-medium">
              Descripción:
            </strong>
            <p className="mt-1 text-lg text-white">
              {activeResource?.description || "No hay descripcion"}
            </p>
          </div> */}

          {/* <div className={!isOut ? "hidden" : undefined}>
            <strong className="block text-primary font-medium">
              Retirado por:
            </strong>
            <p className="mt-1 text-white">
              {activeResource.withdrawer || "No se espesifico"}
            </p>
          </div> */}

          <User name={activeWorker?.displayName} className="text-4xl" />
        </div>
        <div className="mt-4 flex flex-row text-center">
          <strong>Cantidad de recursos de este mes:</strong>
          <p className="mt-1 text-primary text-center mx-3 font-bold">
            {activeWorker?.resourceTools.length || 0}
          </p>
        </div>
        <div className=" h-[80vh] w-full flex flex-col items-center ">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Dynamic tabs" items={tabs}>
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  {item.content}
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </div>
      {/* <DrawerInfoComponent
        isOpen={isOpenDrawerMovement}
        onOpenChange={onOpenChangeDrawerMovement}
        title="DETALLES DEL MOVIEMINTO"
      /> */}
      <DrawerInfoUpdateComponent
        isOpen={isOpenDrawerUpdate}
        onOpenChange={onOpenChangeDrawerUpdate}
      />
      {/* <DrawerEditResourceComponent
        isOpen={isOpenDrawerEdit}
        onOpenChange={onOpenChangeDrawerEdit}
        newResource={activeResource}
      />  */}
    </div>
  );
};
