import { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  Grid,
  TextField,
  FormHelperText,
  Button,
} from '@mui/material';
import api from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [buttonActive, setButtonActive] = useState(true);
  const { getUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setButtonActive(false);
    try {
      api
        .createSession(email, password)
        .then(() => {
          setButtonActive(true);
          getUser();
        })
        .catch((e) => {
          setFormError('Wrong email or password');
          console.log(e);
          setButtonActive(true);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
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
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
