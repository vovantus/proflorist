import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CreateBouquetButton = () => {
  return (
    <NavLink to="bouquet/add">
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
