import { CSSProperties, useContext } from 'react';
import { Box, Grid, SxProps, Theme, useTheme } from '@mui/material';
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

  const theme = useTheme();
  let imgToShow: string = img || course.imgUrl || noImage;

  return (
    <Grid item sx={{ lineHeight: 0 }} xs={12} md={6} lg={4}>
      <Box
        component="img"
        sx={{
          width: '100%',
          maxHeight: '200px',
          objectFit: 'contain',
          backgroundColor: theme.palette.background.default,
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
