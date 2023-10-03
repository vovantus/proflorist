import AppHeader from './AppHeader';
import { Grid } from '@mui/material';

function Layout({ children }) {
  return (
    <div>
      <AppHeader />
      <div className="content" style={{ margin: '20px 20px 20px 70px' }}>
        <Grid container spacing={2}>
          {/* Main content */}
          {children}
        </Grid>
      </div>
    </div>
  );
}

export default Layout;
