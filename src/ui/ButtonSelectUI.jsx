import { Button } from "@heroui/react";
import { useState } from "react";

export const ButtonSelectUI = ({ onInputChange, selectedOption }) => {
  const buttons = [
    { id: 1, title: "Entrada", value: "input" },
    { id: 2, title: "Salida", value: "output" },
  ];

  return (
    <div className="flex space-x-4 w-full justify-around">
      {buttons.map((button) => (
        <Button
          fullWidth
          size="lg"
          type="button"
          variant="faded"
          key={button.id}
          onPress={() =>
            onInputChange({ target: { name: "typeMovement", value: button.value} })
          }
          className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-200
                ${
                  selectedOption === button.value
                    ? button.title == "Entrada"
                      ? "bg-success"
                      : "bg-danger"
                    : "bg-content1 hover:bg-gray-300"
                }
              `}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};
