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
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useForm } from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewResource,
  setActiveResource,
} from "../store/resource/resourceSlice";
import {
  startAddResource,
  startAddStockIn,
  startAddStockOut,
  startSearchingResourceByName,
} from "../store/resource/thunks";
import { unitObj } from "../enum/unitEnum";
import { validationForm } from "../data/validationForm";

const initialForm = {
  name: "",
  date: null,
  quantity: 0,
  unit: "UNIDAD",
  description: "",
  withdrawer: "not-output",
  delete: false,
};

export const DrawerInputComponent = ({
  title,
  isOpen,
  onOpenChange,
  isOut = false,
}) => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { resources, activeResource } = useSelector((state) => state.resource);
  const [newResource, setNewResource] = useState(isOut ? "exist" : "");

  const {
    formState,
    name,
    date,
    quantity,
    unit,
    description,
    withdrawer,
    onInputChange,
    onInputChangeAutocomplete,
    onResetForm,

    //validaciones
    isFormValid,
    nameValid,
    unitValid,
    withdrawerValid,
    quantityValid,
    dateValid,
  } = useForm(initialForm, validationForm);

  useEffect(() => {
    dispatch(setActiveResource(formState));
  }, [formState]);

  const onSubmit = () => {
    setFormSubmitted(true);

    if (isFormValid) {
      if (newResource == "new") {
        dispatch(startAddResource());
      } else if (newResource == "exist") {
        if (isOut) {
          dispatch(startSearchingResourceByName(activeResource.name));
          dispatch(startAddStockOut(activeResource.id));
        } else {
          dispatch(startSearchingResourceByName(activeResource.name));
          dispatch(startAddStockIn(false, activeResource.id));
        }
      }
      setTimeout(() => {
        onResetForm();
      }, 1000);
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
        setNewResource(isOut ? "exist" : "");
        onResetForm();
        setFormSubmitted(false);
      }}
    >
      <DrawerContent className="">
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Nueva {title}
            </DrawerHeader>
            <DrawerBody>
              <Form onSubmit={onSubmit}>
                {newResource.includes("new") ? (
                  <Input
                    label="Nombre del recurso"
                    name="name"
                    onChange={onInputChange}
                    value={name}
                    isInvalid={formSubmitted && !!nameValid}
                    errorMessage={formSubmitted ? nameValid : null}
                  />
                ) : newResource.includes("exist") || isOut ? (
                  <Autocomplete
                    defaultItems={resources}
                    label="Buscar recurso..."
                    onInputChange={(e) => onInputChangeAutocomplete(e, "name")}
                    name="name"
                    value={name}
                    // isInvalid={formSubmitted && !!nameValid}
                    // errorMessage={formSubmitted ? nameValid : null}
                  >
                    {(item, index) => (
                      <AutocompleteItem key={item.id} textValue={item.name}>
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                ) : (
                  <div className="flex gap-3 justify-center items-center w-full">
                    <Button
                      variant="ghost"
                      color="primary"
                      className="hover:text-text"
                      fullWidth
                      size="lg"
                      onPress={() => setNewResource("new")}
                    >
                      Nuevo
                    </Button>
                    <p>O</p>
                    <Button
                      variant="ghost"
                      color="primary"
                      className="hover:text-text"
                      fullWidth
                      size="lg"
                      onPress={() => setNewResource("exist")}
                    >
                      Existente
                    </Button>
                  </div>
                )}
                <DatePicker
                  defaultValue={today(getLocalTimeZone())}
                  label="Fecha"
                  minValue={isOut ? today(getLocalTimeZone()) : null}
                  name="date"
                  isInvalid={formSubmitted && !!dateValid}
                  errorMessage={formSubmitted ? dateValid : null}
                  /**
                   * Redux almacena la fecha como un string "YYYY-MM-DD" para evitar errores.
                   * Sin embargo, el DatePicker de HeroUI necesita un objeto `CalendarDate`,
                   * por lo que la convertimos usando `parseDate()`.
                   */
                  value={formState.date ? parseDate(formState.date) : null}
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                  onSelect={() => console.log(e)}
                />
                <div className="flex gap-3 w-full">
                  <Input
                    label="Cantidad"
                    className={newResource ? "w-full" : "w-3/5"}
                    name="quantity"
                    onChange={onInputChange}
                    value={quantity}
                    type="number"
                    isInvalid={formSubmitted && !!quantityValid}
                    errorMessage={formSubmitted ? quantityValid : null}
                  />
                  {newResource != "exist" && (
                    // <Autocomplete
                    //   className="w-2/5"
                    //   name="unit"
                    //   onInputChange={(e) =>
                    //     onInputChangeAutocomplete(e, "unit")
                    //   }
                    //   value={unit}
                    //   defaultItems={unitObj}
                    //   label="Unidades"
                    // >
                    //   {(item, index) => (
                    //     <AutocompleteItem key={item.value}>
                    //       {item.value}
                    //     </AutocompleteItem>
                    //   )}
                    // </Autocomplete>
                    <Select
                      className="w-2/5"
                      items={unitObj}
                      label="Unidad"
                      name="unit"
                      value={unit}
                      onChange={onInputChange}
                      placeholder="Elegí una unidad"
                      onSelectionChange={(e) => console.log(e)}
                      isInvalid={formSubmitted && !!unitValid}
                      errorMessage={formSubmitted ? unitValid : null}
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.value}</SelectItem>
                      )}
                    </Select>
                  )}
                </div>
                <Textarea
                  label="Descripción"
                  name="description"
                  onChange={onInputChange}
                  value={description}
                />

                {isOut && (
                  <Input
                    label="¿Quien retira?"
                    name="withdrawer"
                    onChange={onInputChange}
                    value={withdrawer || ""}
                  />
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
