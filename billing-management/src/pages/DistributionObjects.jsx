import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  fetchDistributionObjects,
  createDistributionObject,
  updateDistributionObject,
  deleteDistributionObject,
} from '../api/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DistributionObjects = () => {
  const [objects, setObjects] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [editId, setEditId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObject = { name, type, area };
    try {
      if (editId) {
        await updateDistributionObject(editId, newObject);
        setEditId(null);
      } else {
        await createDistributionObject(newObject);
      }
      setName('');
      setType('');
      setArea('');
      const response = await fetchDistributionObjects();
      setObjects(response.data);
    } catch (error) {
      console.error('Error creating/updating distribution object:', error);
    }
  };

  const handleEdit = (object) => {
    setName(object.name);
    setType(object.type);
    setArea(object.area);
    setEditId(object.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDistributionObject(id);
      const response = await fetchDistributionObjects();
      setObjects(response.data);
    } catch (error) {
      console.error('Error deleting distribution object:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Distribution Objects
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          {editId ? 'Update' : 'Create'}
        </Button>
      </form>
      {objects.length > 0 && (
        <Paper style={{ marginTop: '16px', padding: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {objects.map((object) => (
                <TableRow key={object.id}>
                  <TableCell>{object.id}</TableCell>
                  <TableCell>{object.name}</TableCell>
                  <TableCell>{object.type}</TableCell>
                  <TableCell>{object.area}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(object)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(object.id)}>
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
