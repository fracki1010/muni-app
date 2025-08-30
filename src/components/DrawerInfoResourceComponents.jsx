import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableColumn,
  TableCell,
  Alert,
} from "@heroui/react";

import { useSelector } from "react-redux";

import { formatLongDate } from "../helpers";
import { useIsMobile } from "../hooks/useIsMobile";

export const DrawerInfoResourceComponent = ({ isOpen, onOpenChange, title }) => {
  let {isMobile} = useIsMobile();
  const { activeResource } = useSelector((state) => state.resource);
  

  return (
    <Drawer
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "left"}
      size={isMobile ? "lg" : "md"}
    >
      <DrawerContent className="">
        {(onClose) => (
          <>
            <DrawerBody className="flex items-start justify-center p-3">
              <div className="max-w-xl mx-auto p-8  w-full">
                {activeMovement?.delete && (
                  <Alert
                    className="mt-14 mb-6"
                    variant="solid"
                    color="danger"
                    title="Este recurso fue eliminado"
                  />
                )}
                <h2 className="text-2xl text-primary font-semibold mb-4">
                  {title}
                </h2>

                <div className="mb-4">
                  <strong className="block text-primary font-medium">
                    Movimiento realizado por: 
                  </strong>
                  <p className="mt-1 text-white">{activeMovement?.user?.name}</p>
                </div>

                <div className="mb-4">
                  <strong className="block text-primary font-medium">
                    Cantidad:
                  </strong>
                  <p className="mt-1 text-white">{activeMovement?.quantity}</p>
                </div>

                <div className="mb-4">
                  <strong className="block text-primary font-medium">
                    Fecha:
                  </strong>
                  <p className="mt-1 text-white">
                    {formatLongDate(activeMovement?.date)}
                  </p>
                </div>

                <div className="mb-4">
                  <strong className="block text-primary font-medium">
                    Fecha de Creación:
                  </strong>
                  <p className="mt-1 text-white">
                    {formatLongDate(activeMovement?.dateCreation)}
                  </p>
                </div>

                <div>
                  <strong className="block text-primary font-medium">
                    Descripción:
                  </strong>
                  <p className="mt-1 text-white">
                    {activeMovement?.description || "No hay descripcion"}
                  </p>
                </div>

                {activeMovement.withdrawer ? (
                  <div>
                    <strong className="block text-primary font-medium">
                      Retirado por:
                    </strong>
                    <p className="mt-1 text-white">
                      {activeMovement?.withdrawer || "No se espesifico"}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
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
