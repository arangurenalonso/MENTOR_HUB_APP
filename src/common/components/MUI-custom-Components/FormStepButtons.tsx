import { Box, Button } from '@mui/material';

type StepNavigationButtonsProps = {
  handleNext: () => void;
  handleBack: () => void;
  isLastStep: boolean;
  isInitial: boolean;
};

const StepNavigationButtons: React.FC<StepNavigationButtonsProps> = ({
  handleNext,
  handleBack,
  isLastStep,
  isInitial,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {!isInitial && (
        <Button variant="contained" onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      )}
      {!isLastStep && (
        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
          Next
        </Button>
      )}
    </Box>
  );
};

export default StepNavigationButtons;
