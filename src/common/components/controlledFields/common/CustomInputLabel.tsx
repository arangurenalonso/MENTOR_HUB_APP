import { Box, Tooltip, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import HtmlTooltip from '../../MUI-custom-Components/CustomWidthTooltip';
type CustomInputLabelType = {
  label?: string;
  informationText?: string;
};

const CustomInputLabel = ({ label, informationText }: CustomInputLabelType) => {
  const theme = useTheme(); // Accede al tema actual aquí
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log('aaa');

    setOpen(true);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {label}
      {informationText && (
        <HtmlTooltip
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={undefined}
          title={informationText}
        >
          <IconButton
            onClick={() => {
              handleOpen();
            }}
            size="small"
            sx={{ p: 0 }}
          >
            <InfoIcon />
          </IconButton>
        </HtmlTooltip>
      )}
    </Box>
  );
};

export default CustomInputLabel;
