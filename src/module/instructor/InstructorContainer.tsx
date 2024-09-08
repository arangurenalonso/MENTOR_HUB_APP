import { Outlet } from 'react-router-dom';
import InstructorLayout from './layout/InstructorLayout';
import useInstructorStore from '../../hooks/useInstructorStore';
import { useEffect } from 'react';
import useCourseStore from '../../hooks/useCourseStore';

const InstructorContainer = () => {
  const { onGetInstructorConnectedProcess } = useInstructorStore();
  const { onGetCourseByInstructorConnectedProcess } = useCourseStore();
  useEffect(() => {
    onGetInstructorConnectedProcess();
    onGetCourseByInstructorConnectedProcess();
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
