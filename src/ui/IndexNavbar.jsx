import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Button, Typography } from "@mui/material";

export const IndexNavbar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Button variant="contained">Agregar entrada</Button>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{ p: 0.5, px: 1.5 }}
        >
          <ListItemIcon>
            <DraftsIcon fontSize="1.5rem" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">Recursos</Typography>}
          />
        </ListItemButton>
        <Divider />
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={{ p: 0.5, px: 1.5 }}
        >
          <ListItemIcon>
            <DraftsIcon fontSize="1.5rem" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">Entradas</Typography>}
          />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={{ p: 0.5, px: 1.5 }}
        >
          <ListItemIcon>
            <DraftsIcon fontSize="1.5rem" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">Salidas</Typography>}
          />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
};
