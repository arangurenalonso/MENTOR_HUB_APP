import { Box, Grid } from '@mui/material';
import useCourseStore from '../../../hooks/useCourseStore';
import {
  CourseInstructorCard,
  CourseInstructorHover,
  CourseInstructorImage,
  CourseInstructorTitle,
} from '../view/course-card/course-card-instructor';
import { CourseType } from '../../../store/course/course.type';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const { courses } = useCourseStore();

  const navigate = useNavigate();

  const handleOnClick = (course: CourseType) => {
    navigate(`/instructor/course/${course.id}`);
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '700px' }}>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course.id} item xs={12}>
            <CourseInstructorCard course={course} onClick={handleOnClick}>
              {({}) => (
                <>
                  <CourseInstructorImage />
                  <CourseInstructorTitle />
                  <CourseInstructorHover />
                </>
              )}
            </CourseInstructorCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
