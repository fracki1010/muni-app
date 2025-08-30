import {
  Button,
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { ArrowCircleDown, ArrowCircleUp, UpdateOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayUnit } from "../helpers/getUnitToShow";
import { formatLongDate, formatShortDate } from "../helpers";
import { EyeIcon } from "./TableInfoComponent";
import { setActiveMovement } from "../store/resource/resourceSlice";
import { useIsMobile } from "../hooks/useIsMobile";

export const TableMovementsWorkerComponents = ({ onOpen }) => {
  const { movements } = useSelector((state) => state.worker);
  const [selectedTable, setSelectedTable] = useState([]);

  const { isMobile } = useIsMobile();

  const dispatch = useDispatch();

  const onDeleteSelected = () => {
    // dispatch(startDeletingResources(selectedTable));
    // dispatch(startLoadingResources());
  };

  const onSelectionChange = (e) => {
    // const arraySelected = [];
    // if (e === "all") {
    //   for (let entrada of movements) {
    //     arraySelected.push(entrada.id);
    //   }
    // } else {
    //   for (let entrada of e.entries()) {
    //     arraySelected.push(entrada[0]);
    //   }
    // }
    // setSelectedTable(arraySelected);
  };
  return (
    <>
    <Table
      className=" max-w-[100%] "
      color="primary"
      //   selectionMode="none"
      isHeaderSticky
      aria-label="Tabla de movimientos"
      bottomContentPlacement="inside"
      // onSelectionChange={(e) => console.log(e.size)
      onSelectionChange={(e) => onSelectionChange(e)}
    >
      <TableHeader>
        <TableColumn>FECHA</TableColumn>
        <TableColumn>RECURSO</TableColumn>
        <TableColumn>{isMobile ? "CANT" : "CANTIDAD"}</TableColumn>
        <TableColumn>{isMobile ? "MOV" : "MOVIMIENTO"}</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>

      {movements.length === 0 ? (
        <TableBody emptyContent={"No hay movimientos"}>{[]}</TableBody>
      ) : (
        <TableBody isLoading={<Spinner />}>
          {movements.map((item) => {
            return (
              <TableRow key={item?._id}>
                <TableCell>{formatShortDate(item?.date, false)}</TableCell>
                <TableCell>{item?.resourceId ? item?.resourceId?.name : "No hay recurso"}</TableCell>
                <TableCell>
                  {
                  item?.quantity ? (
                    `${item?.quantity} 
                (${
                  item?.resourceId?.unit &&
                  getDisplayUnit(item?.resourceId?.unit)
                })`
              ) : (
                "No hay cantidad"
              )}

                </TableCell>
                {/* <TableCell className="w-10">
                  <Button
                    color="primary"
                    variant="light"
                    className=" hover:text-content1"
                    size="sm"
                    onPress={(e) => {
                      onOpenDrawerInfo(e);
                      dispatch(startSearchingInputAndOutputById(item.id));
                    }}
                  >
                    <Visibility />
                  </Button>
                </TableCell> */}
                <TableCell>
                  {isMobile ? (
                    item?.typeMovement == "input" ? (
                      <ArrowCircleDown color="success" />
                    ) : item?.typeMovement == "output" ? (
                      <ArrowCircleUp color="error" />
                    ) : <UpdateOutlined color="success" />
                  ) : (
                    <Chip
                      variant="faded"
                      color={
                        item?.typeMovement == "output" ? "danger" : "success"
                      }
                      startContent={
                        item?.typeMovement == "input" ? (
                          <ArrowCircleDown />
                        ) : item?.typeMovement == "output" ? (
                          <ArrowCircleUp />
                        ) : (
                          <UpdateOutlined />
                        )
                      }
                    >
                      {item?.typeMovement == "input" ? "Entrada" : item?.typeMovement == "output" ? "Salida" : "Actualización"}
                    </Chip>
                  )}
                </TableCell>
                <TableCell className="w-10">
                  <div className="relative flex items-center justify-center gap-2">
                    <Tooltip content="Detalles">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => {
                          dispatch(setActiveMovement(item));
                          onOpen();
                        }}
                      >
                        <EyeIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
    </>
  );
};
