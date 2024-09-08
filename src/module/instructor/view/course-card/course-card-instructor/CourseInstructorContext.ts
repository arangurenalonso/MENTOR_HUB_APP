import { createContext } from 'react';
import { CourseType } from '../../../../../store/course/course.type';

interface CourseInstructorContextProps {
  course: CourseType;
  onClick?: (course: CourseType) => void;
  isHovered: boolean;
}

const CourseInstructorContext = createContext(
  {} as CourseInstructorContextProps
);

export default CourseInstructorContext;
