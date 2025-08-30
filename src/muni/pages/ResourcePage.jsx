import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  startLoadMovementsOfResource,
  startSearchingResourceById,
} from "../../store/resource/thunks";
import { Button, Divider, Spinner, useDisclosure } from "@heroui/react";
import { Edit } from "@mui/icons-material";
import { formatLongDate } from "../../helpers";
import { TableInfoComponent } from "../../components/TableInfoComponent";
import { DrawerInfoComponent } from "../../components";
import { useMuniStore } from "../../hooks/useMuniStore";
import { DrawerInfoUpdateComponent } from "../../components/DrawerInfoUpdateComponent";
import { DrawerEditResourceComponent } from "../../components/DrawerEditResourceComponent";

export const ResourcePage = () => {
  const { startLoadingResourceById, startLoadingMovementOfResource } = useMuniStore();
  const { activeResource, isLoading } = useSelector((state) => state.resource);
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

  useEffect(() => {
    // dispatch(startLoadMovementsOfResource(id));
    startLoadingResourceById(id);
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
        <div className="shadow-2xl rounded-lg bg-content1 h-[80vh] p-5 w-full md:w-[40%] overflow-auto">
          {/* {activeResource.delete && (
            <Alert
              className="mt-14 mb-6"
              variant="solid"
              color="danger"
              title="Este recurso fue eliminado"
            />
          )} */}
          <div className="flex justify-between">
            <h2 className="text-2xl text-primary font-bold mb-4">
              Detalles del recurso
            </h2>
            <Button variant="light" isIconOnly onPress={onOpenChangeDrawerEdit}>
              <Edit />
            </Button>
          </div>

          <div className="mb-4">
            <strong className="block text-primary font-medium">Nombre:</strong>
            <p className="mt-1 text-lg text-white">{activeResource?.name}</p>
          </div>

          <div className="mb-4">
            <strong className="block text-primary font-medium">
              Cantidad:
            </strong>
            <p className="mt-1 text-lg text-white">
              {activeResource?.quantity}
            </p>
          </div>

          <div className="mb-4">
            <strong className="block text-primary font-medium">Unidad:</strong>
            <p className="mt-1 text-lg text-white">{activeResource?.unit}</p>
          </div>
          <div className="mb-4">
            <strong className="block text-primary font-medium">
              Fecha de Creación:
            </strong>
            <p className="mt-1 text-lg text-white">
              {formatLongDate(activeResource?.dateCreation)}
            </p>
          </div>

          <div>
            <strong className="block text-primary font-medium">
              Descripción:
            </strong>
            <p className="mt-1 text-lg text-white">
              {activeResource?.description || "No hay descripcion"}
            </p>
          </div>

          {/* <div className={!isOut ? "hidden" : undefined}>
            <strong className="block text-primary font-medium">
              Retirado por:
            </strong>
            <p className="mt-1 text-white">
              {activeResource.withdrawer || "No se espesifico"}
            </p>
          </div> */}
        </div>
        <div className=" h-[80vh] w-full md:w-[56%] flex flex-col items-center ">
          <h3 className="text-2xl font-bold">Historial</h3>
          <TableInfoComponent
            onOpenDrawerUpdate={onOpenDrawerUpdate}
            onOpenDrawerMovement={onOpenDrawerMovement}
          />
        </div>
      </div>
      <DrawerInfoComponent
        isOpen={isOpenDrawerMovement}
        onOpenChange={onOpenChangeDrawerMovement}
        title="DETALLES DEL MOVIEMINTO"
      />
      <DrawerInfoUpdateComponent
        isOpen={isOpenDrawerUpdate}
        onOpenChange={onOpenChangeDrawerUpdate}
      />
      <DrawerEditResourceComponent
        isOpen={isOpenDrawerEdit}
        onOpenChange={onOpenChangeDrawerEdit}
        newResource={activeResource}
      />
    </div>
  );
};
