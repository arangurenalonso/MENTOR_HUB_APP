import { Box, Button } from '@mui/material';

type StepNavigationButtonsProps = {
  handleNext: () => void;
  disabledNext?: boolean;
  handleBack: () => void;
  isLastStep: boolean;
  isInitial: boolean;
};

const StepNavigationButtons: React.FC<StepNavigationButtonsProps> = ({
  handleNext,
  handleBack,
  isLastStep,
  isInitial,
  disabledNext,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {!isInitial && (
        <Button variant="contained" onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      )}
      <Button
        variant="contained"
        disabled={disabledNext}
        onClick={handleNext}
        sx={{ mt: 1, mr: 1 }}
      >
        {!isLastStep ? 'Next' : 'Finish'}
      </Button>
    </Box>
  );
};

export default StepNavigationButtons;
