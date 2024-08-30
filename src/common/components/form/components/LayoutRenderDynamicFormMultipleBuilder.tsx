import { Grid, Box, Button } from '@mui/material';
import { ReactNode, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    <Grid
      container
      spacing={1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid item xs>
        {children}
      </Grid>
      {isHovered && showButtonDelete && (
        <Grid item>
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
  );
};

export default LayoutRenderDynamicFormMultipleBuilder;
