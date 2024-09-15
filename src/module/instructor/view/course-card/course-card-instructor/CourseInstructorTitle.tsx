import { CSSProperties, useContext } from 'react';
import CourseInstructorContext from './CourseInstructorContext';
import { SxProps, Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export interface CourseInstructorTitleProps {
  title?: string;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

const CourseInstructorTitle = ({
  title,
  className,
  style,
  sx,
}: CourseInstructorTitleProps) => {
  const { course } = useContext(CourseInstructorContext);
  const titleToShow = title || course.title;

  return (
    <Grid
      size={{ xs: 12, sm: 'grow' }}
      style={style}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        ...sx,
        py: 2,
      }}
      className={`${className}`}
    >
      <Typography variant="h6">{titleToShow}</Typography>
    </Grid>
  );
};

export default CourseInstructorTitle;
