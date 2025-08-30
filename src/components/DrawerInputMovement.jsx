import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
  NumberInput,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  form,
  Form,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import {
  getLocalTimeZone,
  now,
  parseDate,
  parseZonedDateTime,
  today,
} from "@internationalized/date";
import { useForm } from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewResource,
  setActiveMovement,
  setActiveResource,
} from "../store/resource/resourceSlice";
import {
  startAddInput,
  startAddResource,
  startAddStockIn,
  startAddStockOut,
  startSearchingResourceByName,
} from "../store/resource/thunks";
import { unitObj } from "../enum/unitEnum";
import { validationForm, validationFormMovement } from "../data/validationForm";
import { getDateInternationalized } from "../helpers";
import { ButtonSelectUI } from "../ui/ButtonSelectUI";
import { useMuniStore } from "../hooks/useMuniStore";

const initialForm = {
  typeMovement: "input",
  name: "",
  // dateCreation: new Date().toLocaleString('es-AR'),  // 🇦🇷 Argentina
  date: getDateInternationalized(now(getLocalTimeZone())),
  // date: new Date().toLocaleString('es-AR'),
  quantity: 0,
  description: "",
  withdrawer: "unknown",
};

export const DrawerInputMovement = ({ isOpen, onOpenChange }) => {
  const { startAddMovement } = useMuniStore();
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { resources, activeMovement } = useSelector((state) => state.resource);
  const { workersNames } = useSelector((state) => state.worker);

  const {
    formState,
    // name,
    resourceId,
    date,
    quantity,
    description,
    withdrawer,
    workerId,
    typeMovement,

    onInputChange,
    onInputChangeAutocomplete,
    onResetForm,

    //validaciones
    isFormValid,
    // nameValid,
    withdrawerValid,
    quantityValid,
    dateValid,
  } = useForm(initialForm, validationFormMovement);

  useEffect(() => {
    dispatch(setActiveMovement(formState));
  }, [formState]);

  const [datePicker, setDatePicker] = useState(now(getLocalTimeZone()));

  const onSubmit = () => {
    onInputChange(datePicker);

    setFormSubmitted(true);
    if (isFormValid) {
      // dispatch(startAddInput());

      startAddMovement(formState);

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
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Nuevo Movimiento
            </DrawerHeader>
            <DrawerBody>
              <Form onSubmit={onSubmit}>
                <ButtonSelectUI
                  onInputChange={onInputChange}
                  selectedOption={typeMovement}
                />

                <Autocomplete
                  defaultItems={resources}
                  label="Buscar recurso..."
                  onInputChange={(e) => onInputChangeAutocomplete(e, "name")}
                  name="name"
                  value={resourceId}
                  // isInvalid={formSubmitted && !!nameValid}
                  // errorMessage={formSubmitted ? nameValid : null}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id}
                      onPress={() =>
                        onInputChange({
                          target: { value: item.id, name: "resourceId" },
                        })
                      }
                    >
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <DatePicker
                  defaultValue={today(getLocalTimeZone())}
                  label="Fecha"
                  //   minValue={isOut ? today(getLocalTimeZone()) : null}
                  name="date"
                  isInvalid={formSubmitted && !!dateValid}
                  errorMessage={formSubmitted ? dateValid : null}
                  /**
                   * Redux almacena la fecha como un string "YYYY-MM-DD" para evitar errores.
                   * Sin embargo, el DatePicker de HeroUI necesita un objeto `CalendarDate`,
                   * por lo que la convertimos usando `parseDate()`.
                   */
                  value={
                    // formState.date ? parseZonedDateTime(`${formState.date}[${timezone}]`) : null
                    datePicker
                  }
                  onChange={(e) => {
                    // onInputChange(e);
                    setDatePicker(e);
                  }}
                />
                <div className="flex gap-3 w-full">
                  <Input
                    label="Cantidad"
                    className="w-full"
                    name="quantity"
                    onChange={onInputChange}
                    value={quantity}
                    type="number"
                    isInvalid={formSubmitted && !!quantityValid}
                    errorMessage={formSubmitted ? quantityValid : null}
                  />
                </div>
                <Textarea
                  label="Descripción"
                  name="description"
                  onChange={onInputChange}
                  value={description}
                />

                {/* {typeMovement === 'output' && (
                  <Input
                    label="¿Quien retira?"
                    name="withdrawer"
                    onChange={onInputChange}
                    value={withdrawer || ""}
                    isInvalid={formSubmitted && !!withdrawerValid}
                    errorMessage={formSubmitted ? withdrawerValid : null}
                  />
                  
                )} */}
                {typeMovement === 'output' && (
                  <Autocomplete
                  defaultItems={workersNames}
                  label="Buscar obrero..."
                  onInputChange={(e) => onInputChangeAutocomplete(e, "workerId")}
                  name="workerId"
                  value={workerId}
                  // isInvalid={formSubmitted && !!nameValid}
                  // errorMessage={formSubmitted ? nameValid : null}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id}
                      onPress={() =>
                        onInputChange({
                          target: { value: item.id, name: "workerId" },
                        })
                      }
                    >
                      {item.displayName}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                  
                )}
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
