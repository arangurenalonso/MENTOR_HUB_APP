import { CSSProperties, useContext, useState } from 'react';
import { Box, Skeleton, SxProps, Theme, useTheme } from '@mui/material';
import noImage from '../../../../../assets/no-image.jpg';
import CourseInstructorContext from './CourseInstructorContext';
import Grid from '@mui/material/Grid2';

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

  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();
  let imgToShow: string = img || course.imgUrl || noImage;

  return (
    <Grid
      sx={{
        lineHeight: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      size={{ xs: 12, sm: 'auto' }}
    >
      <Box
        sx={{
          width: {
            xs: 187,
            sm: 249,
            md: 311,
          },
          height: {
            xs: 105,
            sm: 140,
            md: 175,
          },
        }}
      >
        {!imageLoaded && ( // Mostrar el Skeleton mientras la imagen no se ha cargado
          <>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'100%'}
              height={'100%'}
            />
          </>
        )}
        <Box
          component="img"
          sx={{
            display: imageLoaded ? 'block' : 'none',
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            backgroundColor: theme.palette.background.default,
            ...sx,
          }}
          style={style}
          className={`${className}`}
          src={imgToShow}
          alt={`Course-Image-${course.title}`}
          onLoad={() => {
            console.log('AAA');
            setImageLoaded(true);
          }}
          onError={() => setImageLoaded(true)}
        />
      </Box>
    </Grid>
  );
};

export default CourseInstructorImage;
