import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormHelperText,
  CardMedia,
} from '@mui/material';
import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDelay } from '../../hooks/useDelay';
import URLS from '../../routes/urls';
import ImageCropper from '../../components/ImageCropper';
import Loading from '../../components/Loading';
import { useHttp, AuthenticationError } from '../../hooks/useHttp';

export default function AddBouquet() {
  const [bouquet, setBouquet] = useState({
    name: '',
    price: '',
    description: '',
  });

  const [errorFields, setErrorFields] = useState(new Map());
  const [buttonActive, setButtonActive] = useState(true);
  const [formError, setFormError] = useState('');
  const setButtonActiveDelayed = useDelay(setButtonActive, 1000);
  const navigate = useNavigate();
  const [addingImage, setAddingImage] = useState(false);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const addBouquetSafe = useHttp(api.createBouquet);

  const editBouquetField = (e) => {
    const { name, value } = e.target;
    const newFields = new Map(errorFields);
    newFields.delete(name);
    setErrorFields(newFields);
    setBouquet({
      ...bouquet,
      [name]: value,
    });
    setButtonActive(true);
  };

  const editPriceField = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    editBouquetField(e);
    setButtonActive(true);
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
    }
    return true;
  };

  const verifyImage = () => {
    if (!image) {
      setErrorFields((errorFields) => {
        const newFields = new Map(errorFields);
        newFields.set('image', 'Please add image');
        return newFields;
      });
      return false;
    }
    return true;
  };

  const verifyFields = (bouquet) => {
    const verificationFunctions = [
      verifyName(bouquet.name),
      verifyPrice(bouquet.price),
      verifyImage(),
    ];

    return verificationFunctions.every((el) => el === true);
  };

  const saveBouquet = async (e) => {
    e.preventDefault();
    setButtonActive(false);

    if (!verifyFields(bouquet)) {
      setButtonActiveDelayed(true);
      return;
    }

    try {
      const imageUrl = await uploadImage();

      console.log(imageUrl);

      const data = {
        Name: bouquet.name,
        Price: bouquet.price,
        Description: bouquet.description,
        Visibility: true,
        ImageUrl: imageUrl,
      };

      setButtonActive(false);
      addBouquetSafe(data)
        .then(() => {
          setButtonActiveDelayed(true);
          setBouquet({
            name: '',
            price: '',
            description: '',
          });
          navigate(URLS.ADMIN);
        })
        .catch((e) => {
          const errorText =
            e instanceof AuthenticationError
              ? 'User not authorised, please log in.'
              : 'Something wrong, reload page and try again';
          setFormError(errorText);
        });
    } catch {
      setFormError('something wrong try again');
    }
  };

  const closeAddingImagePopup = () => {
    setAddingImage(false);
  };

  const uploadImage = async () => {
    try {
      const fileData = await api.uploadFile(image);
      const info = await api.getFile(fileData.$id);
      return info.href;
    } catch (error) {
      console.error(error);
      setButtonActiveDelayed(true);
      setErrorFields((errorFields) => {
        const newFields = new Map(errorFields);
        newFields.set('image', 'Image error, please upload another one');
        return newFields;
      });
      throw error;
    }
  };

  const setImageAndActivateButton = (image) => {
    setImage(image);
    setImageUrl(URL.createObjectURL(image));
    setButtonActiveDelayed(true);
  };

  const handleAddImageClick = () => {
    setAddingImage(true);
    const newFields = new Map(errorFields);
    newFields.delete('image');
    setErrorFields(newFields);
  };

  return (
    <Container style={{ paddingTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Add new bouquet
      </Typography>

      <form onSubmit={saveBouquet}>
        <FormControl fullWidth error={formError ? true : false}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            rowSpacing={1}
            columnSpacing={1}
            className="addBouquetForm"
          >
            {imageUrl && (
              <Grid item xs={12} className="bouquetAddGridItem">
                <CardMedia
                  alt="new bouquet"
                  image={imageUrl}
                  className="addBouquetImage"
                />
              </Grid>
            )}
            <Grid item xs={12} className="bouquetAddGridItem">
              <Button
                variant="contained"
                color="primary"
                label="Add image"
                onClick={handleAddImageClick}
              >
                {image ? 'Change image' : 'Add image'}
              </Button>
            </Grid>
            {errorFields.has('image') && (
              <Grid item xs={12} className="bouquetAddGridItem">
                <div className="imageError">{errorFields.get('image')}</div>
              </Grid>
            )}

            {addingImage && (
              <ImageCropper
                open={addingImage}
                onClose={closeAddingImagePopup}
                setImage={setImageAndActivateButton}
              />
            )}

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
                className="addBouquetButton"
              >
                <Loading
                  loading={!buttonActive}
                  size={25}
                  color={'grey'}
                  style={'buttonLoading'}
                />
                {buttonActive && 'Save'}
              </Button>
              <FormHelperText>{formError}</FormHelperText>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Container>
  );
}
