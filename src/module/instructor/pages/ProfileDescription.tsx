import { Typography } from '@mui/material';
import RichTextEditor from '../../../common/components/RichTextEditor';

const ProfileDescription = () => {
  return (
    <>
      <Typography variant="h4">Profile Descrition</Typography>
      <Typography variant="subtitle1">
        This info will go on your public profile. Write in the language you'll
        teaching.
      </Typography>
      <Typography variant="h5">1. Introduce Yourself</Typography>
      <Typography variant="subtitle2">
        Show potencial students who you are! Share your teaching experience and
        passion for education and briefly mention your interests and hobbies.
      </Typography>
      <RichTextEditor />
    </>
  );
};

export default ProfileDescription;
