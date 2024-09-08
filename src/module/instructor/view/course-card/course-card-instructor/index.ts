import CourseInstructorCardComponent, {
  CourseInstructorCardProps,
} from './CourseInstructorCard';
import CourseInstructorTitle, {
  CourseInstructorTitleProps,
} from './CourseInstructorTitle';
import CourseInstructorImage, {
  CourseInstructorImageProps,
} from './CourseInstructorImage';
import CourseInstructorHover, {
  CourseInstructorHoverProps,
} from './CourseInstructorHover';

export { default as CourseInstructorImage } from './CourseInstructorImage';
export { default as CourseInstructorTitle } from './CourseInstructorTitle';
export { default as CourseInstructorHover } from './CourseInstructorHover';

interface CourseInstructorCardHOCProps {
  (props: CourseInstructorCardProps): JSX.Element;
  Title: (props: CourseInstructorTitleProps) => JSX.Element;
  Image: (props: CourseInstructorImageProps) => JSX.Element;
  Hover: (props: CourseInstructorHoverProps) => JSX.Element;
}

export const CourseInstructorCard: CourseInstructorCardHOCProps = Object.assign(
  CourseInstructorCardComponent,
  {
    Title: CourseInstructorTitle,
    Image: CourseInstructorImage,
    Hover: CourseInstructorHover,
  }
);
