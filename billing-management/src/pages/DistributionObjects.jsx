import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchDistributionObjects, deleteDistributionObject } from '../api/api';

const DistributionObjects = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const getObjects = async () => {
      try {
        const response = await fetchDistributionObjects();
        setObjects(response.data);
      } catch (error) {
        console.error('Error fetching distribution objects:', error);
      }
    };
    getObjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDistributionObject(id);
      setObjects(objects.filter((obj) => obj.id !== id));
    } catch (error) {
      console.error('Error deleting distribution object:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Distribution Objects
      </Typography>
      {objects.length > 0 && (
        <Paper style={{ padding: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {objects.map((obj) => (
                <TableRow key={obj.id}>
                  <TableCell>{obj.name}</TableCell>
                  <TableCell>{obj.description}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(obj.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default DistributionObjects;
