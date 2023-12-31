import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import URLS from '../routes/urls';

const CreateBouquetButton = () => {
  return (
    <NavLink to={URLS.BOUQUET.ADD}>
      <Button
        sx={{ maxWidth: '100px', marginTop: '20px' }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Add bouquet
      </Button>
    </NavLink>
  );
};

export default CreateBouquetButton;
