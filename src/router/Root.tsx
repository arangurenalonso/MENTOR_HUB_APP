import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import { authStatusEnum } from '../store/auth/auth.initial-state';
import InitComponent from '../common/components/InitComponent';

const Root = () => {
  const { checkAuthTokenProcess, status } = useAuthStore();

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    checkAuthTokenProcess();
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(splashTimeout);
  }, []);

  if (showSplash || status === authStatusEnum.INIT) {
    return <InitComponent />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
