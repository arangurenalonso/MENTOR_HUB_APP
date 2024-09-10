import { CSSProperties, useContext } from 'react';
import CourseInstructorContext from './CourseInstructorContext';
import { Grid, SxProps, Theme } from '@mui/material';

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
      item
      xs
      style={style}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        ...sx,
      }}
      className={`${className}`}
    >
      {titleToShow}
      <br />
      Category:{course?.subCategory?.category?.description}
      <br />
      SubCategory: {course?.subCategory?.description}
      <br />
      Level: {course?.level?.description}
    </Grid>
  );
};

export default CourseInstructorTitle;
