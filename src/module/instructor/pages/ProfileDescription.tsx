import { Box, Typography } from '@mui/material';
import useInstructorStore from '../../../hooks/useInstructorStore';
import DinamicallyFormBuilder from '../../../common/components/form/DinamicallyFormBuilder';
import formProfileInformation from '../form/formProfileInformation';
import { useEffect, useRef, useState } from 'react';
import StepNavigationButtons from '../../../common/components/MUI-custom-Components/FormStepButtons';
import VerticalStepper from '../../../common/components/MUI-custom-Components/VerticalStepper';
import { ProfileFormField } from '../type/instructor-form.type';
import CalendarGrid from '../../../common/components/calendar/AvailabilityGrid';

const ProfileDescription = () => {
  const [valuesToSet, setValuesToSet] = useState<Partial<ProfileFormField>>({});
  const { instructor, onUpdateInstructorProfile } = useInstructorStore();

  useEffect(() => {
    if (instructor) {
      setValuesToSet({
        introduction: instructor.introductionText || '',
        teachingExperience: instructor.teachingExperienceText || '',
        motivation: instructor.motivationText || '',
        headline: instructor.headline || '',
      });
    }
  }, [instructor]);

  // const onSubmit = async (data: ProfileFormField) => {
  // console.log('data', data);
  // const instructorUpdateData: updateInstructorProfileArgs = {
  //   headline: data.headline,
  //   introduction: convertToRaw(data.introduction.getCurrentContent()),
  //   teachingExperience: convertToRaw(
  //     data.teachingExperience.getCurrentContent()
  //   ),
  //   motivation: convertToRaw(data.motivation.getCurrentContent()),
  // };
  // onUpdateInstructorProfile(instructorUpdateData);
  // };

  const formProfileRef = useRef<{
    submit: (
      onSubmit: (data: ProfileFormField, onAfterSubmit?: () => void) => void,
      onAfterSubmit?: () => void
    ) => void;
  }>(null);

  const handleCourseInformationSubmit = async (
    data: ProfileFormField,
    onAfterSubmit?: () => void
  ) => {
    console.log('Form data:', data);
    const result = await onUpdateInstructorProfile(data);

    if (onAfterSubmit && result) {
      onAfterSubmit();
    }
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '900px', height: '100%', p: 1 }}>
      <VerticalStepper
        stepsLabels={['Profile Descrition']}
        render={{
          firstChild: ({ handleNext, handleBack, isInitial, isLastStep }) => {
            return (
              <>
                <Typography variant="h4">Profile Descrition</Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  This info will go on your public profile. Write in the
                  language you'll teaching.
                </Typography>
                <DinamicallyFormBuilder<ProfileFormField>
                  ref={formProfileRef}
                  fieldsObject={formProfileInformation}
                  valuesToSet={valuesToSet}
                />
                <StepNavigationButtons
                  handleBack={handleBack}
                  handleNext={() => {
                    if (formProfileRef.current) {
                      formProfileRef.current.submit(
                        handleCourseInformationSubmit,
                        handleNext
                      );
                    }
                  }}
                  isLastStep={isLastStep}
                  isInitial={isInitial}
                />
              </>
            );
          },
        }}
      />
    </Box>
  );
};

export default ProfileDescription;
