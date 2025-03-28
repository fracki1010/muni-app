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
import { isMobile } from "../helpers/isMobile";


export const DrawerInfoComponent = ({ isOpen, onOpenChange, isOut = false, title }) => {

    let isMobileDrawer = isMobile();
    const { activeResource } = useSelector((state) => state.resource);

  return (
    <Drawer
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={ isMobileDrawer ? "bottom" : "left"}
      size={ isMobileDrawer ? "lg" : "sm"}
    >
      <DrawerContent className="">
        {(onClose) => (
          <>
            <DrawerBody className="flex items-start justify-center">
                <div className="max-w-xl mx-auto p-8  w-full">
                  {activeResource.delete && <Alert className="mt-14 mb-6" variant="solid" color="danger" title='Este recurso fue eliminado' />}
                  <h2 className="text-2xl text-primary font-semibold mb-4">
                    {title}
                  </h2>


                  <div className="mb-4">
                    <strong className="block text-primary font-medium">
                      Nombre:
                    </strong>
                    <p className="mt-1 text-white">{activeResource.name}</p>
                  </div>

                  <div className="mb-4">
                    <strong className="block text-primary font-medium">
                      Cantidad:
                    </strong>
                    <p className="mt-1 text-white">{activeResource.quantity}</p>
                  </div>

                  <div className="mb-4">
                    <strong className="block text-primary font-medium">
                      Unidad:
                    </strong>
                    <p className="mt-1 text-white">{activeResource.unit}</p>
                  </div>
                  <div className="mb-4">
                    <strong className="block text-primary font-medium">
                      Fecha de Creación:
                    </strong>
                    <p className="mt-1 text-white">{activeResource.date}</p>
                  </div>

                  <div>
                    <strong className="block text-primary font-medium">
                      Descripción:
                    </strong>
                    <p className="mt-1 text-white">
                      {activeResource.description || "No hay descripcion"}
                    </p>
                  </div>

                  <div className={ !isOut ? 'hidden' : undefined} >
                    <strong className="block text-primary font-medium">
                      Retirado por:
                    </strong>
                    <p className="mt-1 text-white">
                      {activeResource.withdrawer || "No se espesifico"}
                    </p>
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
