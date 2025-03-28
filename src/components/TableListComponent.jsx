import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  DateRangePicker,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@heroui/react";
import { getStatusResource } from "../helpers/getStatusResource";
import { useDispatch } from "react-redux";
import { showResource } from "../store/resource/resourceSlice";
import {
  startDeletingResources,
  startLoadingInputsAndOutputsDate,
  startSearchingInputAndOutputById,
} from "../store/resource/thunks";
import { getDisplayUnit } from "../helpers/getUnitToShow";
import { parseDate } from "@internationalized/date";
import { getDateInternationalized } from "../helpers/getDateInternationalized.JS";
import { format, subMonths } from "date-fns";
import { useState } from "react";
import { Delete, Print, Visibility } from "@mui/icons-material";

export const TableListComponent = ({ array = [], is, onOpenDrawerInfo }) => {
  const dispatch = useDispatch();
  const [selectedTable, setSelectedTable] = useState([]);

  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");

  const onDatePickerChange = (e) => {
    const start = getDateInternationalized(e.start);
    const end = getDateInternationalized(e.end);

    dispatch(startLoadingInputsAndOutputsDate(start, end, is));
  };

  const onDeleteSelected = () => {
    dispatch(startDeletingResources(selectedTable));
  };

  const onSelectionChange = (e) => {
    const arraySelected = [];
    if (e === "all") {
      for (let entrada of array) {
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
    <Table
    className=" max-w-[100%] "
      color="primary"
      selectionMode={is === "resources" ? "multiple" : "none"}
      isHeaderSticky
      aria-label="Tabla de recursos"
      bottomContentPlacement="inside"
      // onSelectionChange={(e) => console.log(e.size)
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
      {is === "inputs" ? (
        <TableHeader>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>RECURSO</TableColumn>
          <TableColumn>CANTIDAD</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
      ) : is === "resources" ? (
        <TableHeader>
          <TableColumn>RECURSO</TableColumn>
          <TableColumn>CANTIDAD</TableColumn>
          <TableColumn>STATUS</TableColumn>
          {/* <TableColumn>ACTIONS</TableColumn> */}
        </TableHeader>
      ) : (
        <TableHeader>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>RECURSO</TableColumn>
          {/* <TableColumn>CANTIDAD</TableColumn> */}
          <TableColumn>RETIRADO</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
      )}

      {array.length === 0 ? (
        <TableBody emptyContent={'No hay recursos'} >{[]}</TableBody>
      ) : (
        <TableBody isLoading={<Spinner />}>
          {is === "inputs"
            ? array.map((item) => {
                return (
                  <TableRow key={item.id || item.name}>
                    <TableCell className={item.delete && "line-through"}>
                      {item.date}
                    </TableCell>
                    <TableCell className={item.delete && "line-through"}>
                      {item.name}
                    </TableCell>
                    <TableCell className={item.delete && "line-through"}>
                      {`${item.quantity} 
                (${getDisplayUnit(item.unit)})`}
                    </TableCell>
                    <TableCell className="w-10">
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
                    </TableCell>
                  </TableRow>
                );
              })
            : is === "resources"
            ? array.map((item) => {
                const status = getStatusResource(item.quantity);
                return (
                  <TableRow key={item.id || item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{`${item.quantity} (${getDisplayUnit(
                      item.unit
                    )})`}</TableCell>

                    <TableCell>
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
                    </TableCell>
                    {/* <TableCell className="w-10">
                  <Button color="primary" variant="light" size="sm" isIconOnly>
                  <Dropdown backdrop="blur">
                  <DropdownTrigger>
                        <Button variant="bordered">
                        <MoreVert />
                        </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" variant="faded">
                        <DropdownItem
                        startContent={<Visibility />}
                        onPress={(e) => {
                          onOpenDrawerInfo(e);
                          dispatch(showResource(item.id));
                          }}
                          key="copy"
                          >
                          {" "}
                          Ver
                          </DropdownItem>
                        <DropdownItem key="edit" startContent={<Edit />}>
                          {" "}
                          Edit file
                        </DropdownItem>
                        <DropdownItem
                        startContent={<Delete />}
                        key="delete"
                        className="text-danger"
                          color="danger"
                          >
                          Borrar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </Button>
                </TableCell> */}
                  </TableRow>
                );
              })
            : array.map((item) => {
                return (
                  <TableRow key={item.id || item.name}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    {/* <TableCell>{`${item.quantity} (${getDisplayUnit(
                  item.unit
                )})`}</TableCell> */}
                    <TableCell>{item.withdrawer}</TableCell>
                    <TableCell className=" w-10">
                      <Button
                        color="primary"
                        variant="light"
                        className=" hover:text-content1"
                        size="sm"
                        onPress={(e) => {
                          onOpenDrawerInfo(e);
                          dispatch(
                            startSearchingInputAndOutputById(item.id, false)
                          );
                        }}
                      >
                        <Visibility />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      )}
    </Table>
  );
};
