import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function AddBouquet() {
  const [bouquet, setBouquet] = useState({
    name: '',
    price: '',
    description: '',
  });

  const navigate = useNavigate();

  const editBouquetField = (e) => {
    const { name, value } = e.target;
    setBouquet({
      ...bouquet,
      [name]: value,
    });
  };

  const saveBouquet = (e) => {
    e.preventDefault();
    const data = {
      Name: bouquet.name,
      Price: bouquet.price,
      Description: bouquet.description,
      Visibility: true,
    };
    console.log(data);

    api
      .createBouquet(data)
      .then((result) => {
        setBouquet({
          name: '',
          price: '',
          description: '',
        });
        navigate('/proflorist/');
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(bouquet);
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Add new bouquet
      </Typography>
      <form onSubmit={saveBouquet}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bouquet-name"
              label="Name"
              name="name"
              variant="outlined"
              onChange={editBouquetField}
              value={bouquet.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bouquet-price"
              label="Price"
              name="price"
              variant="outlined"
              onChange={editBouquetField}
              value={bouquet.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="bouquet-description"
              label="Description"
              name="description"
              variant="outlined"
              onChange={editBouquetField}
              value={bouquet.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
