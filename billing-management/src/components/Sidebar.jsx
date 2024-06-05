import React from 'react';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/bills">
          <ListItemText primary="Bills" />
        </ListItem>
        <ListItem button component={Link} to="/distribution">
          <ListItemText primary="Distribution" />
        </ListItem>
        <ListItem button component={Link} to="/forecast">
          <ListItemText primary="Forecast" />
        </ListItem>
        <ListItem button component={Link} to="/create-bill">
          <ListItemText primary="Create Bill" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
