import { useForm } from 'react-hook-form';
import RichTextEditorControlledField from '../../../common/components/controlledFields/RichTextEditorControlledField';
import { convertToRaw, EditorState } from 'draft-js';
import { Box, Typography } from '@mui/material';
import useInstructorStore, {
  updateInstructorProfileArgs,
} from '../../../hooks/useInstructorStore';
import TextFieldControlledField from '../../../common/components/controlledFields/TextFieldControlledField';
import TitleIcon from '@mui/icons-material/Title';

type ProfileFormValues = {
  headline: string;
  introductionPlainText: string;
  introduction: EditorState;

  teachingExperiencePlainText: string;
  teachingExperience: EditorState;

  motivationPlainText: string;
  motivation: EditorState;
};

const ProfileDescription = () => {
  const { instructor, onUpdateInstructorProfile } = useInstructorStore();

  const { handleSubmit, control, setValue } = useForm<ProfileFormValues>({
    mode: 'onTouched',
  });
  const onSubmit = async (data: ProfileFormValues) => {
    console.log('data', data);

    const instructorUpdateData: updateInstructorProfileArgs = {
      headline: data.headline,
      introduction: convertToRaw(data.introduction.getCurrentContent()),
      teachingExperience: convertToRaw(
        data.teachingExperience.getCurrentContent()
      ),
      motivation: convertToRaw(data.motivation.getCurrentContent()),
    };
    onUpdateInstructorProfile(instructorUpdateData);
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '700px' }}>
      <Typography variant="h4">Profile Descrition</Typography>
      <Typography variant="subtitle1">
        This info will go on your public profile. Write in the language you'll
        teaching.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">1. Introduce Yourself</Typography>
        <Typography variant="subtitle2">
          Show potencial students who you are! Share your teaching experience
          and passion for education and briefly mention your interests and
          hobbies.
        </Typography>
        <RichTextEditorControlledField<ProfileFormValues>
          name="introduction"
          namePlainText="introductionPlainText"
          valueToSet={instructor?.introductionText}
          placeholder={`Hello, my name is... and I'm from....`}
          control={control}
          setValue={setValue}
          rules={{
            required: 'El contenido es requerido',
            minLength: {
              value: 10,
              message: 'El contenido debe tener al menos 10 caracteres',
            },
          }}
        />

        <Typography variant="h5">2. Teaching experience</Typography>
        <Typography variant="subtitle2">
          Provide a detailed description of your relevant teaching
          experience.include certifications, teaching methodology, education,
          and subject expertise.
        </Typography>
        <RichTextEditorControlledField<ProfileFormValues>
          name="teachingExperience"
          namePlainText="teachingExperiencePlainText"
          valueToSet={instructor?.teachingExperienceText}
          placeholder={`I have 5 years of teaching experience. I'm TEFL Certified, and my classes are.....`}
          control={control}
          setValue={setValue}
          rules={{
            required: 'El contenido es requerido',
            minLength: {
              value: 10,
              message: 'El contenido debe tener al menos 10 caracteres',
            },
          }}
        />
        <Typography variant="h5">3. Motivate potential students</Typography>
        <Typography variant="subtitle2">
          Encorage students to book their first lesson. Highlight the benefits
          of learning with you.
        </Typography>
        <RichTextEditorControlledField<ProfileFormValues>
          name="motivation"
          namePlainText="motivationPlainText"
          valueToSet={instructor?.motivationText}
          control={control}
          placeholder={`I have 5 years of teaching experience. I'm TEFL Certified, and my classes are.....`}
          setValue={setValue}
          rules={{
            required: 'El contenido es requerido',
            minLength: {
              value: 10,
              message: 'El contenido debe tener al menos 10 caracteres',
            },
          }}
        />
        <Typography variant="h5">4. Write a catchy headline</Typography>
        <Typography variant="subtitle2">
          Your headline is the first thing students will see. Make it
          attention-grabbing, mention your specific teaching and encourage
          students to read your full description.
        </Typography>
        <TextFieldControlledField
          name="headline"
          // label="Heading"
          // defaultValue={'AAAA'}
          icon={TitleIcon}
          valueToSet={instructor?.headline}
          control={control}
          placeholder={`Full Stack Web developer with over than 5 years of experience.`}
          setValue={setValue}
          rules={{
            required: 'El contenido es requerido',
            minLength: {
              value: 2,
              message: 'El contenido debe tener al menos 2 caracteres',
            },
            maxLength: {
              value: 60,
              message: 'El contenido debe tener menos d60 caracteres',
            },
            pattern: {
              value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
              message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
            },
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};

export default ProfileDescription;
