import { Outlet } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';

const AuthContainer = () => {
  return (
    <>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </>
  );
};

export default AuthContainer;
