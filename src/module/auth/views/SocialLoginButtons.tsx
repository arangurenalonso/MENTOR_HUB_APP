import React from 'react';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useGeolocation from '../../../hooks/useGeolocation';
import useAuthStore from '../../../hooks/useAuthStore';

const SocialLoginButtons: React.FC = () => {
  const { signInGoogleProcess } = useAuthStore();
  const { timezone } = useGeolocation();

  const onGoogleSignIn = () => {
    const timeZoneIntl = Intl.DateTimeFormat().resolvedOptions().timeZone;

    signInGoogleProcess(timezone || timeZoneIntl);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ mt: 2 }}
        onClick={onGoogleSignIn}
      >
        Continue with Google
      </Button>
    </Box>
  );
};

export default SocialLoginButtons;
