import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { Button, Input } from "@heroui/react";
import Logo from "./../../../assets/muni-app.png";

export const LoginPage = () => {
  const initialForm = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const { email, password, formState, onInputChange } = useForm(initialForm);
  const { errorMessage } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formState);

    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  return (
    <div className="min-w-screen flex justify-center h-screen">
      <form
        onSubmit={onSubmit}
        className="text-center mt-5 w-80 content-center" // w-80 equivale a ancho de 320px, similar a 300px
      >
        <img src={Logo} alt="logo" />
        <h5 className="text-2xl font-semibold mb-4">Iniciar Sesión</h5>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={onInputChange}
          labelPlacement="inside"
          label="Correo Electrónico"
        />
        <Input
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
      </form>
    </div>
  );
};
