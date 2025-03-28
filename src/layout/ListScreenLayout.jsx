import React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { orders } from "../../data/data";

export const ListScreenLayout = ({ title, headArray, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "start",
        width: "100vw",
        gap: 1,
        height: "84vh",
        overflow: "auto",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 6,
          p: 2,
          width: "95%",
          alignSelf: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <Search sx={{ fontSize: 30, alignSelf: "center" }} />
        </IconButton>
        <Button variant="contained">Agregar recurso</Button>
      </Paper>

      <Paper
        elevation={6}
        sx={{
          borderRadius: 6,
          p: 3,
          pt: 2,
          width: "95%",
          justifySelf: "center",
          alignSelf: "center",
          overflow: "auto",
          height: "700px",
        }}
      >
        <Table>
          <TableHead>
            <Typography fontSize={25} fontWeight="bold" p={1}>
              {title}
            </Typography>
            <TableRow>
              {headArray.map((head) => {
                return (
                  <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                    {head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.product.name}</TableCell>

                <TableCell>{order.orderDate}</TableCell>
              </TableRow>
            ))} */}
            {children}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
