import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import DinamicallyFormBuilder from '../../../common/components/form/DinamicallyFormBuilder';
import { CourseFormField } from '../type/course.type';
import formCourseInformation from '../form/formCourseInformation';
// import { FieldValues } from 'react-hook-form';

const Courses = () => {
  const valuesToSet: Partial<CourseFormField> = {
    category: '68ff9a1c-18fd-4fa1-9197-b669273d5aeb',
    subCategory: 'f954e1b3-a5ba-44a2-a4d4-9c41ef838d00',
    courseTitle: 'Este es un valor seteado desde el componente',
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formRef = useRef<{
    submit: (onSubmit: (data: CourseFormField) => void) => void;
  }>(null);
  const handleSubmit = (data: CourseFormField) => {
    console.log('Form data:', data);
    // Aquí puedes manejar los datos del formulario
  };
  const onSubmitClick = () => {
    if (formRef.current) {
      formRef.current.submit(handleSubmit);
    }
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '700px' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Course Information</StepLabel>
          <StepContent>
            <DinamicallyFormBuilder<CourseFormField>
              ref={formRef}
              fieldsObject={formCourseInformation}
              valuesToSet={valuesToSet}
            />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
                disabled={activeStep === 0}
              >
                Back
              </Button>

              <button type="button" onClick={onSubmitClick}>
                Submit Form
              </button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Enrollment Criteria</StepLabel>
          <StepContent>
            {/* <DinamicallyFormBuilder<CourseFormField>
              fieldsObject={formEnrollmentCriteria}
              valuesToSet={valuesToSet}
            /> */}
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Create an ad</StepLabel>
          <StepContent>
            <Typography>
              Try out different ad text to see what brings in the most
              customers, and learn how to enhance your ads using features like
              ad extensions. If you run into any problems with your ads, find
              out how to tell if they're running and how to resolve approval
              issues.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                disabled={activeStep === 2}
              >
                Finish
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Courses;
