import { Box, Typography } from '@mui/material';
import ThemeSwitcher from '../../common/components/ThemeSwitcher';

type TitleWithThemeToggleProp = {
  title: string;
};

const TitleWithThemeToggle = ({ title }: TitleWithThemeToggleProp) => {
  return (
    <>
      <Typography variant="h4" component="h4" mb={2}>
        {' '}
        Welcome to Mentor Hub!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h5" gutterBottom>
          {title}
        </Typography>
        <ThemeSwitcher />
      </Box>
    </>
  );
};

export default TitleWithThemeToggle;
