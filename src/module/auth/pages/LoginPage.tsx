import { Divider } from '@mui/material';
import LoginForm from '../views/LoginForm';
import SocialLoginButtons from '../views/SocialLoginButtons';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import TextWithLink from '../views/TextWithLink';
const LoginPage = () => {
  return (
    <>
      <TitleWithThemeToggle title="Log in" />
      <SocialLoginButtons />
      <Divider sx={{ my: 3 }}>or</Divider>
      <LoginForm />
      <TextWithLink
        mainText="Don't have an account?"
        linkText="Sign up"
        linkHref="/auth/register"
      />
    </>
  );
};

export default LoginPage;
