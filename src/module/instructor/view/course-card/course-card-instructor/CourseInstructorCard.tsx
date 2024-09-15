import { Paper, SxProps, Theme, useTheme } from '@mui/material';
import { CourseType } from '../../../../../store/course/course.type';
import { CSSProperties, useState } from 'react';
import CourseInstructorContext from './CourseInstructorContext';
import Grid from '@mui/material/Grid2';
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
  const theme = useTheme();

  return (
    <Provider
      value={{
        course,
        onClick,
        isHovered,
      }}
    >
      <Paper
        elevation={3}
        sx={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid
          container
          spacing={1}
          sx={{
            border: '1px solid',
            borderColor: isHovered ? theme.palette.divider : 'transparent',
            ...sx,
          }}
          style={style}
          className={`${className}`}
        >
          {children({
            course,
          })}
        </Grid>
      </Paper>
    </Provider>
  );
};
export default CourseInstructorCard;
