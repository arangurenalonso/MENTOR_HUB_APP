import { Outlet } from 'react-router-dom';
import InstructorLayout from './layout/InstructorLayout';
import useInstructorStore from '../../hooks/useInstructorStore';
import { useEffect } from 'react';

const InstructorContainer = () => {
  const {
    onGetInstructorConnectedProcess,
    //  status: statusInstructor
  } = useInstructorStore();
  useEffect(() => {
    onGetInstructorConnectedProcess();
  }, []);
  return (
    <>
      <InstructorLayout>
        <Outlet />
      </InstructorLayout>
    </>
  );
};

export default InstructorContainer;
