import { Box } from '@mui/material';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Box sx={{ mt: 3, width: '100%', maxWidth: 400, mx: 'auto' }}>
        <div>{children}</div>
      </Box>
    </>
  );
};

export default AuthLayout;
