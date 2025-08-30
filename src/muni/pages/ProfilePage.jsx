import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, Input, Button, alert, addToast } from "@heroui/react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { CheckCircle, Error } from "@mui/icons-material";
import { useAuthStore } from "../../hooks/useAuthStore";

export const ProfilePage = () => {
  const { isMobile } = useIsMobile();
  const { user, alert, errorMessage } = useSelector((state) => state.auth);

  const { startChangePassword } = useAuthStore();

  const { formState, oldPass, newPass, newPassRepit, onInputChange } = useForm({
    oldPass: "",
    newPass: "",
    newPassRepit: "",
  });

  const [isInvalid, setIsInvalid] = useState(false)

  const changePassword = () => {
    if (newPass !== newPassRepit) {
      setIsInvalid(true)
      return;
    } else {
      setIsInvalid(false);
    }

    startChangePassword(oldPass, newPass)

  };


    //Alerta a mensajes de exito
    useEffect(() => {
      alert &&
        addToast({
          title: alert,
          icon: <CheckCircle />,
          variant: "solid",
          color: "secondary",
        });
    }, [alert]);
  
  
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

  return (
    <div className="flex w-full flex-col p-10">
      <Tabs aria-label="Dynamic tabs" isVertical={!isMobile}>
        <Tab title="Informacion personal">
          <Card fullWidth className="flex-grow">
            <CardBody className="flex-grow h-80 w-[72vw]">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Información Personal
              </h3>

              <div className="p-6">
                <p className="mb-2">
                  <strong className="text-primary">Nombre:</strong> {user.name}
                </p>

                <p>
                  <strong className=" text-primary">Email:</strong> {user.email}
                </p>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab title="Cambiar contraseña">
          <Card>
            <CardBody className={`flex-grow ${!isMobile && "w-[72vw]"}`}>
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Cambiar contraseña
              </h3>
              <div className={`${isMobile ? "px-2" : "px-10"} mt-5 w-full`}>
                <Input
                  type="password"
                  className="mb-10"
                  label="Contraseña actual"
                  name="oldPass"
                  value={oldPass}
                  onChange={onInputChange}
                />
                <Input
                  type="password"
                  className="mb-3"
                  label="Nueva contraseña"
                  name="newPass"
                  value={newPass}
                  onChange={onInputChange}
                  isInvalid={isInvalid}
                  errorMessage={
                    isInvalid && "Las contraseñas no son iguales"
                  }
                />
                <Input
                  type="password"
                  label="Repetir contraseña"
                  name="newPassRepit"
                  value={newPassRepit}
                  onChange={onInputChange}
                  isInvalid={isInvalid}
                  errorMessage={
                    isInvalid && "Las contraseñas no son iguales"
                  }
                />
              </div>

              <div className="flex justify-end mx-16">
                <Button
                  className="mt-10"
                  title="Cambiar"
                  color="primary"
                  fullWidth={isMobile}
                  onPress={() => changePassword()}
                >
                  Cambiar
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};
