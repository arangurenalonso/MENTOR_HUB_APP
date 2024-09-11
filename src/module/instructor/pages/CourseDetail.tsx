import { useEffect, useRef, useState } from 'react';
import DinamicallyFormBuilder from '../../../common/components/form/DinamicallyFormBuilder';
import StepNavigationButtons from '../../../common/components/MUI-custom-Components/FormStepButtons';
import VerticalStepper from '../../../common/components/MUI-custom-Components/VerticalStepper';
import useCourseStore from '../../../hooks/useCourseStore';
import formCourseInformation from '../form/formCourseInformation';
import formEnrollmentCriteria from '../form/formEnrollmentCriteria';
import { CourseFormField } from '../type/course-form.type';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import ImageSelector from '../../../common/components/image/ImageSelector';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideoRecorder from '../../../common/components/video/VideoRecorder';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { VideoCameraFront } from '@mui/icons-material';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    onUpdateCoursePromotionalVideoProcess,
    onCreateUpdateCourseInformationProcess,
    onUpdateEnrollmentCriteriaProcess,
    onUpdateCoursePhotoProcess,
    course,
    onSetByIdCourse,
    courses,
  } = useCourseStore();

  const [video, setVideo] = useState<File | undefined | null>(null);
  const [img, setImg] = useState<File | undefined | null>(null);
  const [isNewImg, setIsNewImg] = useState<boolean>(false);
  const [isNewVideo, setIsNewVideo] = useState<boolean>(false);
  const formCourseInformationRef = useRef<{
    submit: (
      onSubmit: (data: CourseFormField, onAfterSubmit?: () => void) => void,
      onAfterSubmit?: () => void
    ) => void;
  }>(null);

  const formEnrollmentCriteriaRef = useRef<{
    submit: (
      onSubmit: (data: CourseFormField, onAfterSubmit?: () => void) => void,
      onAfterSubmit?: () => void
    ) => void;
  }>(null);
  useEffect(() => {
    if (id) {
      if (courses.length > 0) {
        onSetByIdCourse(id);
      }
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
  const handleOnSubmitPhoto = async (onAfterSubmit?: () => void) => {
    if (Boolean(course?.imgUrl) && !isNewImg) {
      if (onAfterSubmit) {
        onAfterSubmit();
      }
      return;
    }
    if (img) {
      const result = await onUpdateCoursePhotoProcess(img);

      if (onAfterSubmit && result) {
        setIsNewImg(false);
        onAfterSubmit();
      }
    }
  };

  const handleOnSubmitPromotionalVideo = async (onAfterSubmit?: () => void) => {
    if (Boolean(course?.promotionalVideoUrl) && !isNewVideo) {
      if (onAfterSubmit) {
        onAfterSubmit();
      }
      return;
    }
    if (video) {
      const result = await onUpdateCoursePromotionalVideoProcess(video);

      if (onAfterSubmit && result) {
        setIsNewVideo(false);
        onAfterSubmit();
      }
    }
  };

  const handleCourseEnrollmentCriteriaSubmit = async (
    data: CourseFormField,
    onAfterSubmit?: () => void
  ) => {
    console.log('Form data:', data);
    const result = await onUpdateEnrollmentCriteriaProcess(data);

    if (onAfterSubmit && result) {
      onAfterSubmit();
    }
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '800px' }}>
      <VerticalStepper
        stepsLabels={[
          'Course Information',
          'Enrollment Criteria',
          'Photo',
          'Promotional Video',
        ]}
        children={{
          firstChild: ({ handleNext, handleBack, isInitial, isLastStep }) => {
            return (
              <>
                <DinamicallyFormBuilder<CourseFormField>
                  ref={formCourseInformationRef}
                  fieldsObject={formCourseInformation}
                  valuesToSet={courseSelected}
                />
                <StepNavigationButtons
                  handleBack={handleBack}
                  handleNext={() => {
                    if (formCourseInformationRef.current) {
                      formCourseInformationRef.current.submit(
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
                valuesToSet={courseSelected}
                ref={formEnrollmentCriteriaRef}
              />
              <StepNavigationButtons
                handleBack={handleBack}
                handleNext={() => {
                  if (formEnrollmentCriteriaRef.current) {
                    formEnrollmentCriteriaRef.current.submit(
                      handleCourseEnrollmentCriteriaSubmit,
                      handleNext
                    );
                  }
                }}
                isLastStep={isLastStep}
                isInitial={isInitial}
              />
            </>
          ),
          thirdChild: ({ handleNext, handleBack, isInitial, isLastStep }) => (
            <>
              {course?.imgUrl && !isNewImg && (
                <>
                  <Box
                    component="img"
                    src={course.imgUrl}
                    alt="Cropped Image"
                    sx={{
                      width: '100%',
                      minHeight: 200,
                      objectFit: 'contain',
                      border: '2px solid #333',
                      borderRadius: 2,
                    }}
                  />

                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsNewImg(true);
                      }}
                      startIcon={<AddAPhotoIcon />}
                      sx={{ mx: 'auto' }}
                    >
                      New
                    </Button>
                  </Box>
                </>
              )}
              {(!course?.imgUrl || isNewImg) && (
                <>
                  <ImageSelector
                    onChange={(file?: File | null | undefined) => {
                      setImg(file);
                    }}
                  />
                  {course?.imgUrl && (
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsNewImg(false);
                        }}
                        startIcon={<InsertPhotoIcon />}
                        sx={{ mx: 'auto' }}
                      >
                        Back to Photo Uploaded
                      </Button>
                    </Box>
                  )}
                </>
              )}
              <StepNavigationButtons
                disabledNext={
                  !(
                    (Boolean(course?.imgUrl) && !isNewImg) ||
                    (Boolean(course?.imgUrl) && isNewImg && Boolean(img)) ||
                    (!Boolean(course?.imgUrl) && Boolean(img))
                  )
                }
                handleBack={handleBack}
                handleNext={() => {
                  handleOnSubmitPhoto(handleNext);
                }}
                isLastStep={isLastStep}
                isInitial={isInitial}
              />
            </>
          ),
          fourChild: ({ handleNext, handleBack, isInitial, isLastStep }) => (
            <>
              {course?.promotionalVideoUrl && !isNewVideo && (
                <>
                  <Box
                    component="video"
                    src={course?.promotionalVideoUrl}
                    controls
                    sx={{
                      width: '100%',
                      minHeight: 200,
                      objectFit: 'contain',
                      border: '2px solid #333',
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsNewVideo(true);
                      }}
                      startIcon={<VideoCameraFrontIcon />}
                      sx={{ mx: 'auto' }}
                    >
                      New
                    </Button>
                  </Box>
                </>
              )}
              {(!course?.promotionalVideoUrl || isNewVideo) && (
                <>
                  <VideoRecorder
                    onChange={(file?: File | null | undefined) => {
                      setVideo(file);
                    }}
                  />
                  {course?.promotionalVideoUrl && (
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsNewVideo(false);
                        }}
                        startIcon={<VideoCameraFront />}
                        sx={{ mx: 'auto' }}
                      >
                        Back to Video Uploaded
                      </Button>
                    </Box>
                  )}
                </>
              )}
              <StepNavigationButtons
                disabledNext={!video}
                handleBack={handleBack}
                handleNext={() => {
                  handleOnSubmitPromotionalVideo(handleNext);
                }}
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
