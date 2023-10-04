import AppHeader from './AppHeader';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <AppHeader />
      <div className="content" style={{ margin: '10px 10px 10px 60px' }}>
        <Grid container spacing={2}>
          {/* Main content */}
          <Outlet />
        </Grid>
      </div>
    </div>
  );
}

export default Layout;
