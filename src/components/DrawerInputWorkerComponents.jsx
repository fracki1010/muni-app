import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
  Form,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useMuniStore } from "../hooks/useMuniStore";
import { setActiveWorker } from "../store/worker/workerSlice";

const initialForm = {
  displayName: "",
};

export const DrawerInputWorkerComponents = ({ isOpen, onOpenChange }) => {
  const { startAddWorker } = useMuniStore();
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { activeWorker } = useSelector((state) => state.worker);

  const {
    formState,
    displayName,
    onInputChange,
    onResetForm,

    //validaciones
    isFormValid,
    displayNameValid,
  } = useForm(initialForm);

  useEffect(() => {
    dispatch(setActiveWorker(formState));
  }, [formState]);

  const onSubmit = () => {
    setFormSubmitted(true);

    if (isFormValid) {
      startAddWorker(formState);

      onResetForm();
    }
  };
  return (
    <Drawer
      shouldBlockScroll={false}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        onResetForm();
        setFormSubmitted(false);
      }}
    >
      <DrawerContent className="">
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Nuevo trabajador
            </DrawerHeader>
            <DrawerBody>
              <Form onSubmit={onSubmit}>
                <div className=" flex justify-evenly w-full gap-2">
                  <Input
                    label="Nombre y apellido del trabajador"
                    name="displayName"
                    onChange={onInputChange}
                    value={displayName}
                    isInvalid={formSubmitted && !!displayNameValid}
                    errorMessage={formSubmitted ? displayNameValid : null}
                  />
                </div>
              </Form>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onSubmit();
                  if (isFormValid) {
                    onClose();
                  }
                }}
              >
                Agregar
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
