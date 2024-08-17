import { Box } from '@mui/material';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      LAYOUT DE MAIN
      <Box sx={{ mt: 3, width: '100%', maxWidth: 400, mx: 'auto' }}>
        <div>{children}</div>
      </Box>
    </>
  );
};

export default MainLayout;
