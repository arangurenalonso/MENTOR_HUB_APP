import { Divider } from '@mui/material';
import RegisterForm from '../views/RegisterForm';
import SocialLoginButtons from '../views/SocialLoginButtons';
import TextWithLink from '../views/TextWithLink';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';

const RegisterPage = () => {
  return (
    <>
      <TitleWithThemeToggle title="Register" />
      <SocialLoginButtons />
      <Divider sx={{ my: 3 }}>or</Divider>
      <RegisterForm />
      <TextWithLink
        mainText="Already have an account?"
        linkText="Log in"
        linkHref="/auth/login"
      />
    </>
  );
};

export default RegisterPage;
