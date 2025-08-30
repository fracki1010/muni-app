import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
// import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { Button, Input } from "@heroui/react";
import Logo from "./../../../assets/muni-app.png";
import { useAuthStore } from "../../hooks/useAuthStore";

export const LoginPage = () => {
  const loginInitialForm = {
    email: "",
    password: "",
  };

  const { email, password, formState, onInputChange } =
    useForm(loginInitialForm);
  const { errorMessage, startLogin } = useAuthStore();

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch(startLoginWithEmailPassword({ email, password }));
    startLogin({ email: email, password: password });
  };

  return (
    <div className="min-w-screen flex justify-center h-screen">
      <form
        onSubmit={onSubmit}
        className="text-center mt-5 content-center w-full flex justify-center items-center" // w-80 equivale a ancho de 320px, similar a 300px
      >
        <div className="flex justify-center flex-wrap w-auto bg-content1 rounded-2xl p-8 h-auto items-center m-10">

        <div className="w-80">
          <img src={Logo} alt="logo" height={500} />
        </div>
        <div className="w-64">
          <h5 className="text-2xl font-semibold mb-4">Iniciar Sesión</h5>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
            labelPlacement="inside"
            label="Correo Electrónico"
            fullWidth
            />
          <Input
          fullWidth
            type="password"
            name="password"
            label="Contraseña"
            labelPlacement="inside"
            value={password}
            onChange={onInputChange}
            className="mt-3"
            />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button
            type="submit"
            color="primary"
            variant="bordered"
            fullWidth
            className="mt-4"
            >
            Iniciar Sesión
          </Button>
        </div>
            </div>
      </form>
    </div>
  );
};
