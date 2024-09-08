import { CSSProperties, useContext } from 'react';
import { Box, Grid, SxProps, Theme, Typography, useTheme } from '@mui/material';
import CourseInstructorContext from './CourseInstructorContext';

export interface CourseInstructorHoverProps {
  textHover?: string;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

const CourseInstructorHover = ({
  textHover,
  className,
  style,
  sx,
}: CourseInstructorHoverProps) => {
  const { onClick, isHovered, course } = useContext(CourseInstructorContext);
  const theme = useTheme();

  return (
    <>
      {isHovered && (
        <Box
          onClick={() => {
            if (onClick) {
              onClick(course);
            }
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.4,
            backgroundColor: theme.palette.primary.main,
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
            ...sx,
          }}
          style={style}
          className={`${className}`}
        >
          <Typography
            variant="h4"
            color={theme.palette.primary.contrastText}
            sx={{ fontWeight: 'bold' }}
          >
            {textHover ? textHover : 'Edit / Manage Course'}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CourseInstructorHover;
