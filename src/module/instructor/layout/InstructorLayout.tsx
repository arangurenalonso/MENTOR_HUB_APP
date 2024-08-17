import { Box } from '@mui/material';
import { ReactNode } from 'react';

const InstructorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      LAYOUT DE Instructor
      <Box sx={{ mt: 3, width: '100%', maxWidth: 400, mx: 'auto' }}>
        <div>{children}</div>
      </Box>
    </>
  );
};

export default InstructorLayout;
