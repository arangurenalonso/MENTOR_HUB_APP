import { Box, Button } from '@mui/material';
import { ReactNode, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid2';

type LayoutRenderDynamicFormMultipleBuilderProps = {
  children: ReactNode;
  index: number;
  showButtonDelete: boolean;
  onRemove: (index: number) => void;
};

const LayoutRenderDynamicFormMultipleBuilder = ({
  children,
  index,
  onRemove,
  showButtonDelete,
}: LayoutRenderDynamicFormMultipleBuilderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOnRemove = () => {
    onRemove(index);
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid size={'grow'}>{children}</Grid>
        {isHovered && showButtonDelete && (
          <Grid size={'auto'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Button
                  onClick={handleOnRemove}
                  variant="outlined"
                  sx={{ height: '100%' }}
                >
                  <DeleteOutlineIcon color="error" />
                </Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default LayoutRenderDynamicFormMultipleBuilder;
