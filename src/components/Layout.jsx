import AppHeader from './AppHeader';
import { Grid } from '@mui/material';

function Layout({ children }) {
  return (
    <div>
      <AppHeader />
      <div className="content">
        <Grid container>
          <Grid item xs={1}>
            {' '}
            {/* Sidebar */}
          </Grid>
          <Grid item xs={10}>
            {' '}
            {/* Main content */}
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Layout;
