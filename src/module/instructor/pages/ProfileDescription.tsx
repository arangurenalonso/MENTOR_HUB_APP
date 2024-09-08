import { Box, Button, Grid, Typography } from '@mui/material';
import useInstructorStore from '../../../hooks/useInstructorStore';
import DinamicallyFormBuilder from '../../../common/components/form/DinamicallyFormBuilder';
import { ProfileFormField } from '../type/course-form.type';
import formProfileInformation from '../form/formProfileInformation';
import { useEffect, useRef, useState } from 'react';

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

  const formRef = useRef<{
    submit: (onSubmit: (data: ProfileFormField) => void) => void;
  }>(null);
  const handleSubmit = (data: ProfileFormField) => {
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Profile Descrition</Typography>
          <Typography variant="subtitle1">
            This info will go on your public profile. Write in the language
            you'll teaching.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DinamicallyFormBuilder<ProfileFormField>
            ref={formRef}
            fieldsObject={formProfileInformation}
            valuesToSet={valuesToSet}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant={'outlined'} onClick={onSubmitClick}>
            Submit Form
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileDescription;
