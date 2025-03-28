
import { Spinner } from "@heroui/react";

export const LoadingCheckAuth = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <Spinner classNames={{label: "text-foreground mt-4"}} label="Cargando datos..." variant="wave" size="lg" />
    </main>
  );
};
