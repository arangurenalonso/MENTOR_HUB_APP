import { CSSProperties, useContext } from 'react';
import { Box, Grid, SxProps, Theme } from '@mui/material';
import noImage from '../../../../../assets/no-image.jpg';
import CourseInstructorContext from './CourseInstructorContext';

export interface CourseInstructorImageProps {
  img?: string;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

const CourseInstructorImage = ({
  img,
  className,
  style,
  sx,
}: CourseInstructorImageProps) => {
  const { course } = useContext(CourseInstructorContext);

  let imgToShow: string = img || course.imgUrl || noImage;

  return (
    <Grid item sx={{ lineHeight: 0 }}>
      <Box
        component="img"
        sx={{
          maxWidth: '250px',
          ...sx,
        }}
        style={style}
        className={`${className}`}
        src={imgToShow}
        alt={`Course-Image-${course.title}`}
      />
    </Grid>
  );
};

export default CourseInstructorImage;
