import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
const LoadingComponent = () => {
  return (
    <Grid
      container
      spacing={0}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid size={12}>
        <CircularProgress color="warning" size={100} />
      </Grid>
    </Grid>
  );
};

export default LoadingComponent;
