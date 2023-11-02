import { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  Grid,
  TextField,
  FormHelperText,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import URLS from '../../routes/urls';
import { Navigate } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [buttonActive, setButtonActive] = useState(true);
  const { user, loginUser } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setButtonActive(false);
    loginUser(email, password).catch(() => {
      setFormError('Wrong email or password');
      setButtonActive(true);
    });
  };
  return user ? (
    <Navigate to={URLS.ADMIN} />
  ) : (
    <Container maxWidth="sm" style={{ paddingTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleLogin} onChange={() => setFormError('')}>
        <FormControl error={formError ? true : false}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="login"
                label="Email"
                name="login"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!buttonActive}
              >
                Login
              </Button>
              <FormHelperText>{formError}</FormHelperText>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Container>
  );
};

export default LoginPage;
