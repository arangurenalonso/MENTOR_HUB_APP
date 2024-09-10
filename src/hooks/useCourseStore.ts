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
  findAndSetCourse,
  onInsertCourse,
  onUpdateCourse,
} from '../store/course/course.slice';
import { courseApi } from '../api/course.api';
import { CourseFormField } from '../module/instructor/type/course-form.type';
import { CourseType } from '../store/course/course.type';
import { convertToRaw, EditorState } from 'draft-js';

const useCourseStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    status,
    courses,
    course: courseSelected,
    errorMessage,
  } = useSelector((state: RootState) => state.courses);
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
  const onCreateUpdateCourseInformationProcess = async (
    form: CourseFormField
  ): Promise<boolean> => {
    dispatch(onChecking());

    if (courseSelected?.id) {
      console.log('Entro al actualizar');

      const courseUpdateResult = await courseApi.updateCourseInformation({
        idCourse: courseSelected.id,
        title: form.courseTitle,
        description: convertionFromCourseDescriptionFormToString(
          form.courseDescription
        ),
        idSubCategory: form.idSubCategory,
        idLevel: form.idLevel,
      });

      if (courseUpdateResult.isErr()) {
        const error = courseUpdateResult.error;
        handleDecodingError(error.error);
        return false;
      }
      const courseUpdated = convertionFromCourseFormToCourseType(
        form,
        courseSelected.id
      );
      dispatch(onUpdateCourse(courseUpdated));
    } else {
      const courseCreateResult = await courseApi.createCourse({
        title: form.courseTitle,
        description: convertionFromCourseDescriptionFormToString(
          form.courseDescription
        ),
        idSubCategory: form.idSubCategory,
        idLevel: form.idLevel,
      });

      if (courseCreateResult.isErr()) {
        const error = courseCreateResult.error;
        handleDecodingError(error.error);
        return false;
      }
      const idCourse = courseCreateResult.value;
      const courseToInsert = convertionFromCourseFormToCourseType(
        form,
        idCourse
      );
      dispatch(onInsertCourse(courseToInsert));
    }
    return true;
  };
  const convertionFromCourseDescriptionFormToString = (
    courseDescription: string | EditorState
  ): string => {
    const description =
      typeof courseDescription === 'string'
        ? courseDescription
        : JSON.stringify(convertToRaw(courseDescription.getCurrentContent()));
    return description;
  };
  const convertionFromCourseFormToCourseType = (
    form: CourseFormField,
    idCourse: string
  ): CourseType => {
    const description = convertionFromCourseDescriptionFormToString(
      form.courseDescription
    );
    const courseType: CourseType = {
      id: idCourse,
      title: form.courseTitle,
      idInstructor: user?.idUser || '',
      level: {
        id: form.idLevel,
        description: form.levelOption?.description,
      },
      subCategory: {
        id: form.idSubCategory,
        category: {
          id: form.idCategory,
          description: form.categoryOption?.description,
        },
        description: form.subCategoryOption?.description,
      },
      description: description,
    };
    return courseType;
  };
  const onSetCourse = (course: CourseType) => {
    dispatch(setCourse(course));
  };
  const onSetByIdCourse = async (id: string) => {
    dispatch(findAndSetCourse(id));
  };
  return {
    //*Properties
    status,
    courses,
    course: courseSelected,
    errorMessage,
    //*Methods
    onCreateUpdateCourseInformationProcess,
    onGetCourseByInstructorConnectedProcess,
    onSetCourse,
    onSetByIdCourse,
  };
};

export default useCourseStore;
