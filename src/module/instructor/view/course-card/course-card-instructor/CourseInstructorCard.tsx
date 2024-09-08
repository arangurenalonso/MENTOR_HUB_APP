import { Box, Grid, SxProps, Theme } from '@mui/material';
import { CourseType } from '../../../../../store/course/course.type';
import { CSSProperties, useState } from 'react';
import CourseInstructorContext from './CourseInstructorContext';

export interface CourseCardHandlers {
  course: CourseType;
}

export interface CourseInstructorCardProps {
  children: (args: CourseCardHandlers) => JSX.Element;
  course: CourseType;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
  onClick?: (course: CourseType) => void;
}

const CourseInstructorCard = ({
  children,
  course,
  className,
  style,
  sx,
  onClick,
}: CourseInstructorCardProps) => {
  const { Provider } = CourseInstructorContext;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Provider
      value={{
        course,
        onClick,
        isHovered,
      }}
    >
      <Box
        sx={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid container sx={sx} style={style} className={`${className}`}>
          {children({
            course,
          })}
        </Grid>
      </Box>
    </Provider>
  );
};
export default CourseInstructorCard;
