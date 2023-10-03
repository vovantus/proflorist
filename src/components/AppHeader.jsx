import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAppBar } from '../contexts/AppBarContext';

function AppHeader() {
  const { isDrawerOpen, toggleDrawer } = useAppBar();

  const menuItems = ['Bouquets', 'Flowers', 'Profile', 'Settings', 'Logout'];

  return (
    <div>
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
                <div key={text} style={{ padding: '8px', textAlign: 'center' }}>
                  {text}
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
                margin: '30px 10px',
              }}
            >
              <Typography variant="h6">
                <Link
                  component={RouterLink}
                  to="/proflorist/"
                  color="white"
                  underline="hover"
                >
                  Proflorist
                </Link>
              </Typography>
            </div>
          )}
        </div>
      </AppBar>
    </div>
  );
}

export default AppHeader;
