import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { ValidateError, ErrorData } from '../utils/adpters/axios-http-client';
import useAuthStore from './useAuthStore';
import {
  onSetError,
  onClear,
  onChecking,
  setCourse,
  setCourses,
} from '../store/course/course.slice';
import { courseApi } from '../api/course.api';
import { CourseFormField } from '../module/instructor/type/course-form.type';
import { CourseType } from '../store/course/course.type';
import { convertToRaw } from 'draft-js';

const useCourseStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, courses, course, errorMessage } = useSelector(
    (state: RootState) => state.courses
  );
  const { user } = useAuthStore();

  const handleDecodingError = (
    errorData: ValidateError[] | ErrorData | string
  ) => {
    let formattedErrorMessage: string = '';

    if (typeof errorData === 'string') {
      formattedErrorMessage = errorData;
    }
    if (Array.isArray(errorData)) {
      formattedErrorMessage = errorData
        .map((err) => `${err.field}: ${err.message}`)
        .join(', ');
    }
    if (
      typeof errorData === 'object' &&
      'type' in errorData &&
      'error' in errorData
    ) {
      formattedErrorMessage = errorData.error;
    }

    dispatch(onSetError(formattedErrorMessage));

    setTimeout(() => {
      dispatch(onClear());
    }, 5000);
  };
  const onGetCourseByInstructorConnectedProcess = async () => {
    dispatch(onChecking());
    const coursesResult = await courseApi.getCoursesByInstructorConnected();
    if (coursesResult.isErr()) {
      const error = coursesResult.error;
      handleDecodingError(error.error);
      return;
    }

    dispatch(setCourses(coursesResult.value));
  };
  const onCreateCourseProcess = async (
    form: CourseFormField
  ): Promise<boolean> => {
    dispatch(onChecking());
    console.log('form.courseDescription', form.courseDescription);

    const description =
      typeof form.courseDescription === 'string'
        ? form.courseDescription
        : JSON.stringify(
            convertToRaw(form.courseDescription.getCurrentContent())
          );

    const courseCreateResult = await courseApi.createCourse({
      title: form.courseTitle,
      description: description,
      idSubCategory: form.idSubCategory,
      idLevel: form.idLevel,
    });
    if (courseCreateResult.isErr()) {
      const error = courseCreateResult.error;
      handleDecodingError(error.error);
      return false;
    }
    const idCourse = courseCreateResult.value;
    const courseType: CourseType = {
      id: idCourse,
      title: form.courseTitle,
      idInstructor: user?.idUser || '',
      level: form.levelOption,
      subCategory: {
        id: form.idSubCategory,
        category: {
          id: form.idCategory,
          description: form.categoryOption.description,
        },
        description: form.subCategoryOption.description,
      },
      description: description,
    };

    dispatch(setCourse(courseType));
    return true;
  };

  return {
    //*Properties
    status,
    courses,
    course,
    errorMessage,
    //*Methods
    onCreateCourseProcess,
    onGetCourseByInstructorConnectedProcess,
  };
};

export default useCourseStore;
