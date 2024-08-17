import { CircularProgress, Grid } from '@mui/material';
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
      <Grid item>
        <CircularProgress color="warning" size={100} />
      </Grid>
    </Grid>
  );
};

export default LoadingComponent;
