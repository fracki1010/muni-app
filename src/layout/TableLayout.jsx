import { Table } from "@heroui/react";
import React from "react";

export const TableLayout = (children) => {
  return (
    <Table
      className=" max-w-[100%] "
      color="primary"
      selectionMode={is === "resources" ? "multiple" : "none"}
      isHeaderSticky
      aria-label="Tabla de recursos"
      bottomContentPlacement="inside"
      onSelectionChange={(e) => onSelectionChange(e)}
      bottomContent={
        selectedTable.length != 0 ? (
          <div className="flex gap-3">
            <Button
              isIconOnly
              color="danger"
              variant="solid"
              onPress={() => onDeleteSelected()}
            >
              <Delete className=" text-black" />
            </Button>
            <Button isIconOnly color="primary" variant="solid">
              <Print className=" text-black" />
            </Button>
          </div>
        ) : (
          false
        )
      }
    >
      {children}
    </Table>
  );
};
