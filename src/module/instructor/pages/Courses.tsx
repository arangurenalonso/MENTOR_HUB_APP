import { Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import DinamicallyFormBuilder from '../../../common/components/form/DinamicallyFormBuilder';
import { CourseFormField } from '../type/course-form.type';
import formCourseInformation from '../form/formCourseInformation';
import VerticalStepper from '../../../common/components/MUI-custom-Components/VerticalStepper';
import formEnrollmentCriteria from '../form/formEnrollmentCriteria';
import StepNavigationButtons from '../../../common/components/MUI-custom-Components/FormStepButtons';
import useCourseStore from '../../../hooks/useCourseStore';
import {
  CourseInstructorCard,
  CourseInstructorHover,
  CourseInstructorImage,
  CourseInstructorTitle,
} from '../view/course-card/course-card-instructor';
import { CourseType } from '../../../store/course/course.type';

const Courses = () => {
  const { onCreateCourseProcess, course, courses } = useCourseStore();
  const formRef = useRef<{
    submit: (
      onSubmit: (data: CourseFormField, onAfterSubmit?: () => void) => void,
      onAfterSubmit?: () => void
    ) => void;
  }>(null);

  const [courseSelected, setCourseSelected] = useState<
    Partial<CourseFormField>
  >({});

  useEffect(() => {
    if (course) {
      const courseFormField: Partial<CourseFormField> = {
        idCategory: course.subCategory.category?.id,
        idLevel: course.level.id,
        idSubCategory: course.subCategory.id,
        courseTitle: course.title,
        courseDescription: course.description,
        requirements: course.requirements || [],
        learningObjectives: course.learningObjectives || [],
        intendedLearners: course.intendedLearners || [],
      };
      setCourseSelected(courseFormField);
    }
  }, [course]);

  const handleCourseInformationSubmit = async (
    data: CourseFormField,
    onAfterSubmit?: () => void
  ) => {
    console.log('Form data:', data);
    const result = await onCreateCourseProcess(data);

    if (onAfterSubmit && result) {
      onAfterSubmit();
    }
  };

  const handleOnClick = (course: CourseType) => {
    console.log('Course clicked', course);
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '700px' }}>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course.id} item xs={12}>
            <CourseInstructorCard course={course} onClick={handleOnClick}>
              {({ course }) => (
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

      <VerticalStepper
        stepsLabels={['Course Information', 'Enrollment Criteria']}
        children={{
          firstChild: ({ handleNext, handleBack, isInitial, isLastStep }) => {
            return (
              <>
                <DinamicallyFormBuilder<CourseFormField>
                  ref={formRef}
                  fieldsObject={formCourseInformation}
                  valuesToSet={courseSelected}
                />
                <StepNavigationButtons
                  handleBack={handleBack}
                  handleNext={() => {
                    if (formRef.current) {
                      formRef.current.submit(
                        handleCourseInformationSubmit,
                        handleNext
                      );
                    }
                  }}
                  isLastStep={isLastStep}
                  isInitial={isInitial}
                />
              </>
            );
          },
          secondChild: ({ handleNext, handleBack, isInitial, isLastStep }) => (
            <>
              <DinamicallyFormBuilder<CourseFormField>
                fieldsObject={formEnrollmentCriteria}
              />
              <StepNavigationButtons
                handleBack={handleBack}
                handleNext={handleNext}
                isLastStep={isLastStep}
                isInitial={isInitial}
              />
            </>
          ),
        }}
      />
    </Box>
  );
};

export default Courses;
