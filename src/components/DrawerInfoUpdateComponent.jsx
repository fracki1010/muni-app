import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Button,
  Alert,
  DrawerHeader,
} from "@heroui/react";

import { useSelector } from "react-redux";
import { useIsMobile } from "../hooks/useIsMobile";
import { formatLongDate, getPropertiesUpdate } from "../helpers";

export const DrawerInfoUpdateComponent = ({ isOpen, onOpenChange, title }) => {
  let {isMobile} = useIsMobile();
  const { activeMovement } = useSelector((state) => state.resource);

  return (
    <Drawer
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "right"}
      size={isMobile ? "lg" : "md"}
    >
      <DrawerContent className="">
        {(onClose) => (
          <>
            <DrawerHeader>
              <h2 className=" text-primary  font-bold text-2xl mb-4">
                Actualizacion del recurso
              </h2>
            </DrawerHeader>
            <DrawerBody className="flex items-start justify-center m-0">
              <div className="max-w-xl mx-auto p-8  w-full mt-24">
                <div className="mt-5">
                  <strong className="block text-primary  font-bold text-xl">
                    Responsable:
                  </strong>
                  <p className="mt-1 text-white">{activeMovement?.user.name}</p>
                </div>

                <div className="mt-5">
                  <strong className="block text-primary  font-bold text-xl">
                    Fecha de Creación:
                  </strong>
                  <p className="mt-1 text-white">
                    {formatLongDate(activeMovement?.dateCreation)}
                  </p>
                </div>

                <div className="mt-5">
                  <strong className="block text-primary  font-bold text-xl">
                    Se realizo un cambio en:
                  </strong>
                  <p className="mt-1 text-white">
                    {activeMovement?.changedFields.map((change) => {
                      return (
                        <span key={change} className="text-white">
                          {getPropertiesUpdate(change)}
                          {activeMovement.changedFields.length - 1 !==
                            activeMovement.changedFields.indexOf(change) &&
                            ", "}
                        </span>
                      );
                    })}
                  </p>
                </div>

                <div className="mt-5">
                  <strong className="block text-primary font-bold text-xl">
                    Datos previos al cambio:
                  </strong>
                  <div className="mt-1 text-white flex flex-col rounded-lg bg-background p-2">
                    {activeMovement?.previousValues ?
                      Object.entries(activeMovement?.previousValues).map(
                        ([key, value], index, array) => (
                          <p key={key} className="text-white">
                            <span className="font-bold text-primary">
                              {getPropertiesUpdate(key)}
                            </span>{" "}
                            : <span className="font-bold ">{value}</span>
                          </p>
                        )
                      )
                      : <p>No tenia valores anteriormente</p>
                    }
                  </div>
                </div>
                <div className="mt-5">
                  <strong className="block text-primary font-bold text-xl">
                    Datos despues del cambio(actuales):
                  </strong>
                  <div className="mt-1 text-white flex flex-col rounded-lg bg-background p-2">
                    {activeMovement?.newValues &&
                      Object.entries(activeMovement?.newValues).map(
                        ([key, value], index, array) => (
                          <p key={key} className="text-white">
                            <span className="font-bold text-primary">
                              {getPropertiesUpdate(key)}
                            </span>{" "}
                            : <span className="font-bold ">{value}</span>
                          </p>
                        )
                      )}
                  </div>
                </div>

              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Salir
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
