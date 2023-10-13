import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAppBar } from '../contexts/AppBarContext';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const { isDrawerOpen, toggleDrawer } = useAppBar();

  const menuItems = ['Bouquets', 'Flowers', 'Profile', 'Settings', 'Logout'];
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('logout');
      api.deleteCurrentSession().then(() => navigate('login'));
    } catch (e) {
      console.log('e');
    }
  };

  return (
    <div>
      {' '}
      {!location.pathname.includes('login') && (
        <AppBar
          position="fixed"
          sx={{
            width: isDrawerOpen ? '200px' : '50px', // Adjust the width as needed
            top: 0,
            left: 0,
            height: '100vh', // Full height of the screen
            flexDirection: 'column', // Vertical layout
            justifyContent: 'flex-start', // Align items to the top
            transition: 'width 0.3s', // Smooth transition for width change
            '@media (max-width: 600px)': {
              width: '100%', // Set full width on screens with max width 600px (mobile devices)
              height: 'auto', // Auto height
              flexDirection: 'row', // Horizontal layout
              justifyContent: 'space-between', // Align items horizontally
              alignItems: 'center', // Center items vertically
              padding: '8px 16px', // Add padding to the app bar for spacing
            },
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            {isDrawerOpen ? (
              <div>
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, textAlign: 'center' }}
                >
                  <Link
                    component={RouterLink}
                    to="/proflorist/"
                    color="white"
                    underline="hover"
                  >
                    Proflorist
                  </Link>
                </Typography>
                {menuItems.map((text) => (
                  <div
                    key={text}
                    style={{ padding: '8px', textAlign: 'center' }}
                  >
                    {text}
                  </div>
                ))}
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  '@media (max-width: 600px)': {
                    display: 'none', // Hide on mobile screens
                  },
                }}
              >
                <Link
                  component={RouterLink}
                  to="/proflorist/"
                  color="white"
                  underline="hover"
                >
                  <div
                    style={{
                      flexGrow: 1,
                      textAlign: 'center',
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'center',
                      margin: '30px 10px',
                    }}
                  >
                    Proflorist
                  </div>
                </Link>
              </Typography>
            )}
          </div>
        </AppBar>
      )}
    </div>
  );
}

export default AppHeader;
