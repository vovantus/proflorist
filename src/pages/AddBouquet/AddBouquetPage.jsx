import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

export default function AddBouquet() {
  const [bouquet, setBouquet] = useState({
    name: '',
    price: '',
    description: '',
  });

  const [errorFields, setErrorFields] = useState(new Map());
  const [buttonActive, setButtonActive] = useState(true);
  const [formError, setFormError] = useState('');

  const setButtonActiveDelayed = useDebounce(setButtonActive, 1000);
  const navigate = useNavigate();

  const editBouquetField = (e) => {
    const { name, value } = e.target;
    const newFields = new Map(errorFields);
    newFields.delete(name);
    setErrorFields(newFields);
    setBouquet({
      ...bouquet,
      [name]: value,
    });
  };

  const editPriceField = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    editBouquetField(e);
  };

  const verifyName = (name) => {
    if (name == '') {
      const newFields = new Map(errorFields);
      newFields.set('name', 'Please enter name for bouquet');
      setErrorFields(newFields);
      return false;
    } else {
      return true;
    }
  };

  const verifyPrice = (price) => {
    if (!price.match(/^\d+$|^\d+\.\d+$|^\d+\.$/)) {
      setErrorFields((errorFields) => {
        const newFields = new Map(errorFields);
        newFields.set('price', 'Enter correct price');
        return newFields;
      });
      return false;
    } else {
      return true;
    }
  };

  const verifyFields = (bouquet) => {
    const verificationFunctions = [
      verifyName(bouquet.name),
      verifyPrice(bouquet.price),
    ];

    return verificationFunctions.every((el) => el === true);
  };

  const saveBouquet = (e) => {
    e.preventDefault();
    if (verifyFields(bouquet)) {
      const data = {
        Name: bouquet.name,
        Price: bouquet.price,
        Description: bouquet.description,
        Visibility: true,
      };
      setButtonActive(false);
      api
        .createBouquet(data)
        .then((result) => {
          setButtonActiveDelayed(true);
          setBouquet({
            name: '',
            price: '',
            description: '',
          });
          navigate('/proflorist/');
          console.log(result);
        })
        .catch((e) => {
          setFormError('Something wrong, reload page and try again');
          console.log(e);
        });
    }
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Add new bouquet
      </Typography>

      <form onSubmit={saveBouquet}>
        <FormControl error={formError ? true : false}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorFields.has('name')}
                helperText={errorFields.get('name')}
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
                error={errorFields.has('price')}
                helperText={errorFields.get('price')}
                fullWidth
                id="bouquet-price"
                label="Price"
                name="price"
                variant="outlined"
                onChange={editPriceField}
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
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!buttonActive}
              >
                Save
              </Button>
              <FormHelperText>{formError}</FormHelperText>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Container>
  );
}
