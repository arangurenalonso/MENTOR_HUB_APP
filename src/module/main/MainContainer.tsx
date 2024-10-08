import { Outlet } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

const MainContainer = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default MainContainer;
