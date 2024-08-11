import React from 'react';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const SocialLoginButtons: React.FC = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ mt: 2 }}
      >
        Continue with Google
      </Button>
    </Box>
  );
};

export default SocialLoginButtons;
