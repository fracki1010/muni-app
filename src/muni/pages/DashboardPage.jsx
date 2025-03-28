import React from "react";
import { LoaderDashboard } from "../../ui/LoaderDashboard";

export const DashboardPage = () => {
  return (
    <div className="flex flex-col justify-center items-center m-6">
      <h1 className="text-primary text-bold text-4xl text-center w-10/12">
        Todavia estamos trabajando porfavor visita las demas pantallas
      </h1>
      <LoaderDashboard />
    </div>
  );
};
