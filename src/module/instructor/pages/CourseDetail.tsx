import { useEffect, useRef, useState } from 'react';
import DinamicallyFormBuilder from '../../../common/components/form/DinamicallyFormBuilder';
import StepNavigationButtons from '../../../common/components/MUI-custom-Components/FormStepButtons';
import VerticalStepper from '../../../common/components/MUI-custom-Components/VerticalStepper';
import useCourseStore from '../../../hooks/useCourseStore';
import formCourseInformation from '../form/formCourseInformation';
import formEnrollmentCriteria from '../form/formEnrollmentCriteria';
import { CourseFormField } from '../type/course-form.type';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    onCreateUpdateCourseInformationProcess,
    course,
    onSetByIdCourse,
    courses,
  } = useCourseStore();
  const formRef = useRef<{
    submit: (
      onSubmit: (data: CourseFormField, onAfterSubmit?: () => void) => void,
      onAfterSubmit?: () => void
    ) => void;
  }>(null);

  useEffect(() => {
    if (courses.length > 0) {
      onSetByIdCourse(id || '');
    }
  }, [id, courses]);
  const [courseSelected, setCourseSelected] =
    useState<Partial<CourseFormField> | null>(null);

  useEffect(() => {
    return () => {
      console.log('CourseDetail -> cleanup');
      setCourseSelected(null);
    };
  }, []);
  useEffect(() => {
    console.log('course', course);

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
    } else {
      setCourseSelected(null);
    }
  }, [course]);

  const handleCourseInformationSubmit = async (
    data: CourseFormField,
    onAfterSubmit?: () => void
  ) => {
    console.log('Form data:', data);
    const result = await onCreateUpdateCourseInformationProcess(data);

    if (onAfterSubmit && result) {
      onAfterSubmit();
    }
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '800px' }}>
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

export default CourseDetail;
