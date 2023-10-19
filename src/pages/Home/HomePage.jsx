import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import URLS from '../../routes/urls';

const HomePage = () => {
  return (
    <NavLink to={URLS.LOGIN}>
      <Button
        sx={{ maxWidth: '100px', marginTop: '20px' }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </NavLink>
  );
};

export default HomePage;
