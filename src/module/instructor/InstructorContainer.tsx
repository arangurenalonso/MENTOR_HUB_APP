import { Outlet } from 'react-router-dom';
import InstructorLayout from './layout/InstructorLayout';

const InstructorContainer = () => {
  return (
    <>
      <InstructorLayout>
        <Outlet />
      </InstructorLayout>
    </>
  );
};

export default InstructorContainer;
