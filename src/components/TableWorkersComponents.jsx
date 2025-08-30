import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Delete, Edit, MoreVert, Print, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { getDisplayUnit } from "../helpers/getUnitToShow";
import { getStatusResource } from "../helpers/getStatusResource";
import { useDispatch, useSelector } from "react-redux";
import { DrawerInputResourceComponents } from "./DrawerInputResourceComponents";
import { startSearchingResourceById } from "../store/resource/thunks";
import { DrawerEditResourceComponent } from "./DrawerEditResourceComponent";
import { useNavigate } from "react-router";
import { useMuniStore } from "../hooks/useMuniStore";
import { useIsMobile } from "../hooks/useIsMobile";

export const TableWorkersComponents = ({ onOpenDrawer }) => {
  const { startDeletingWorkerById } =
    useMuniStore();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { filterWorkers } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  const [selectedTable, setSelectedTable] = useState([]);

  const navigate = useNavigate();

  // const isMobile = useIsMobile();

  const {isMobile} = useIsMobile();
  

//   const onDeleteSelected = () => {
//     // dispatch(startDeletingResources(selectedTable));
//     // dispatch(startLoadingResources());
//     startDeletingResourceGroup(selectedTable);
//   };

  const onSelectionChange = (e) => {
    const arraySelected = [];
    if (e === "all") {
      for (let entrada of filterWorkers) {
        arraySelected.push(entrada.id);
      }
    } else {
      for (let entrada of e.entries()) {
        arraySelected.push(entrada[0]);
      }
    }
    setSelectedTable(arraySelected);
  };

  return (
    <>
      <Table
        className=" max-w-[100%] "
        color="primary"
        // selectionMode={"multiple"}
        isHeaderSticky
        aria-label="Tabla de recursos"
        bottomContentPlacement="outside"
        // onSelectionChange={(e) => console.log(e.size)
        onSelectionChange={(e) => onSelectionChange(e)}
        bottomContent={
          selectedTable.length != 0 ? (
            <div className="flex gap-3 rounded-2xl bg-content1 p-2">
              <Button
                isIconOnly
                color="danger"
                variant="solid"
                onPress={() => onDeleteSelected()}
              >
                <Delete className=" text-black" />
              </Button>
              <Button
                isIconOnly
                color="primary"
                variant="solid"
                onPress={() => console.log("imprimir....")}
              >
                <Print className=" text-black" />
              </Button>
            </div>
          ) : (
            false
          )
        }
      >
        <TableHeader>
          <TableColumn>OBRERO</TableColumn>
          <TableColumn>CANTIDAD DE RECURSOS</TableColumn>
          {/* <TableColumn hidden={isMobile}>STATUS</TableColumn> */}
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        {filterWorkers.length === 0 ? (
          <TableBody emptyContent={"No hay obreros"}>{[]}</TableBody>
        ) : (
          <TableBody isLoading={<Spinner />}>
            {filterWorkers.map((item) => {
            //   const status = getStatusResource(item?.quantity);
              return (
                <TableRow key={item?.id || item?.name}>
                  <TableCell>{item?.displayName}</TableCell>
                  <TableCell>{item?.resourceTools.length}</TableCell>

                  
                    {/* <TableCell hidden={isMobile}>
                      <Chip
                        color={
                          status === "disponible"
                            ? "success"
                            : item.status === "bajo stock"
                            ? "warning"
                            : "danger"
                        }
                        variant="bordered"
                      >
                        {status}
                      </Chip>
                    </TableCell> */}
                  
                  <TableCell className="w-10">
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button variant="light" isIconOnly>
                          <MoreVert />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions" variant="faded">
                        <DropdownItem
                          startContent={<Visibility />}
                          // onPress={(e) => {
                          //   onOpenDrawerInfo(e);
                          //   dispatch(showResource(item.id));
                          // }}
                          onPress={() => navigate(`/workers/${item.id}`)}
                          key="watch"
                        >
                          Ver
                        </DropdownItem>
                        <DropdownItem
                          startContent={<Delete />}
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onPress={() => startDeletingWorkerById(item.id)}
                        >
                          Eliminar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
