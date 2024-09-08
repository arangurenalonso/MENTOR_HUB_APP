import { PhotoCamera } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

type ImagePlaceholderProps = {
  onCLick?: () => void;
};

const ImagePlaceholder = ({ onCLick }: ImagePlaceholderProps) => {
  const handleOnClick = () => {
    if (onCLick) {
      onCLick();
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        borderRadius: 2,
        border: '2px dashed black',
        borderColor: 'text.disabled',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      onClick={handleOnClick}
    >
      <Box>
        <Typography variant="body1">Your Image will appear here</Typography>
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImagePlaceholder;
