import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  useDisclosure,
  Pagination,
  Spinner,
} from "@heroui/react";
import {
  ArrowBackIos,
  ArrowCircleDown,
  ArrowCircleUp,
  Edit,
  HighlightOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startSearchingMovementById } from "../store/resource/thunks";
import { LoadingCheckAuth } from "../ui/LoadingCheckAuth";
import { useMuniStore } from "../hooks/useMuniStore";
import { formatShortDate } from "../helpers";
import { useParams } from "react-router";

export const columns = [
  { name: "RECURSO", uid: "resource" },
  { name: "FECHA DE ENTREGA", uid: "date" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "ACTIONS", uid: "actions" },
];

export const EyeIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const TableInfoWorkerComponent = () => {
  const { id } = useParams();

  const { activeWorker: worker } = useSelector((state) => state.worker);

  // if (movements.length === 0) return <LoadingCheckAuth/>

  //   useEffect(() => {
  //     setTimeout(() => {
  //       startLoadingMovementOfResource(id, 1);
  //     }, 3000);
  //   }, []);

  const onViewMovement = (id, typeMovement) => {
    // dispatch(startSearchingMovementById(id));
    // startLoadingMovementById(id);
    // if (typeMovement === "update") {
    //   onOpenDrawerUpdate();
    // } else {
    //   onOpenDrawerMovement();
    // }
  };

  const nextPage = (page) => {
    // startLoadingMovementOfResource(id, page);
  };

  const renderCell = React.useCallback((resource, columnKey) => {
    const cellValue = resource[columnKey];

    switch (columnKey) {
      case "resource":
        return (
          <p className="text-bold capitalize">{resource?.resource?.name}</p>
        );
      case "date":
        return (
          <p className="text-bold capitalize">
            {formatShortDate(resource?.deliveryDate, false)}
          </p>
        );
      case "quantity":
        return <p>{resource?.quantity}</p>;

      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detalles">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={
                  () => {}
                  //   onViewMovement(movement.id, movement.typeMovement)
                }
              >
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="table information movements"
      fullWidth
      isHeaderSticky
      className=" h-[78vh]"
      bottomContentPlacement="outside"
      //   bottomContent={
      //     <div className="flex w-full justify-center">
      //       <Pagination
      //         isCompact
      //         showControls
      //         showShadow
      //         color="secondary"
      //         page={paginationMovements?.currentPage}
      //         total={paginationMovements?.totalPages}
      //         onChange={(page) => nextPage(page)}
      //       />
      //     </div>
      //   }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={worker?.resourceTools || []}
        emptyContent={<Spinner variant="wave" />}
      >
        {(item) => (
          <TableRow
            key={item._id }
            // className={`${
            //   item.typeMovement === "input" ? "bg-success-400" : item.typeMovement === "output" ? "bg-danger-400" : "bg-blue-100"
            // } bg-opacity-5`}
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
