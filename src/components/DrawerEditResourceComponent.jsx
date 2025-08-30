
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
        startSearchingResourceById,
        startSearchingResourceByName,
    } from "../store/resource/thunks";
    import { unitObj } from "../enum/unitEnum";
    import {
        validationForm,
        validationFormResources,
    } from "../data/validationForm";
import { useMuniStore } from "../hooks/useMuniStore";
    
    
    export const DrawerEditResourceComponent = ({ isOpen, onOpenChange, newResource }) => {
         
        const dispatch = useDispatch();
        const [formSubmitted, setFormSubmitted] = useState(false);
        const { activeResource } = useSelector((state) => state.resource);
        const { startUpdatingResource } = useMuniStore();
      
        const {
          formState,
          name,
          unit,
          description,
          onInputChange,
          onResetForm,
      
          //validaciones
          isFormValid,
          nameValid,
          unitValid,
        } = useForm(activeResource ? activeResource : {name:'', unit:'UNIDAD'}, validationFormResources);
      
        useEffect(() => {
          dispatch(setActiveResource(formState));
        }, [formState]);
      
        const onSubmit = () => {
          setFormSubmitted(true);
      
          if (isFormValid) {
            
            startUpdatingResource(newResource)
      
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
                    Editar Recurso
                  </DrawerHeader>
                  <DrawerBody>
                    <Form onSubmit={onSubmit}>
                      <div className=" flex justify-evenly w-full gap-2">
                        <Input
                          label="Nombre del recurso"
                          name="name"
                          onChange={onInputChange}
                          value={name}
                          isInvalid={formSubmitted && !!nameValid}
                          errorMessage={formSubmitted ? nameValid : null}
                        />
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
                      </div>
                      {/* <DatePicker */}
                      {/* defaultValue={today(getLocalTimeZone())} */}
                      {/* label="Fecha" */}
                      {/* minValue={isOut ? today(getLocalTimeZone()) : null} */}
                      {/* name="date" */}
                      {/* isInvalid={formSubmitted && !!dateValid} */}
                      {/* errorMessage={formSubmitted ? dateValid : null} */}
                      {/*  Redux almacena la fecha como un string "YYYY-MM-DD" para
                      evitar errores. * Sin embargo, el DatePicker de HeroUI necesita
                      un objeto `CalendarDate`, * por lo que la convertimos usando
                      `parseDate()`. */}
                      {/* value={formState.date ? parseDate(formState.date) : null} */}
                      {/* // onChange={(e) => { */}
                      {/* onInputChange(e); */}
                      {/*  }} */}
                      {/* onSelect={() => console.log(e)} */}
                      {/*   />  */}
                      <Textarea
                        label="Descripción"
                        name="description"
                        onChange={onInputChange}
                        value={description}
                      />
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
      