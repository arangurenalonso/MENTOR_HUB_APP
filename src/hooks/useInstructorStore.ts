import { useDispatch, useSelector } from 'react-redux';
import {
  onChecking,
  onSetError,
  onClear,
  seInstructor,
} from '../store/instructor/instructor.slice';
import { instructorApi } from '../api/instructor.api';
import { AppDispatch, RootState } from '../store/store';
import { ValidateError, ErrorData } from '../utils/adpters/axios-http-client';
import { RawDraftContentState } from 'draft-js';
import useAuthStore from './useAuthStore';

export type updateInstructorProfileArgs = {
  headline: string;
  introduction: RawDraftContentState;
  teachingExperience: RawDraftContentState;
  motivation: RawDraftContentState;
};
const useInstructorStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, instructor, errorMessage } = useSelector(
    (state: RootState) => state.instructor
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
  const onGetInstructorConnectedProcess = async () => {
    dispatch(onChecking());
    const instructorResult = await instructorApi.getProfileInstructor();
    if (instructorResult.isErr()) {
      const error = instructorResult.error;
      handleDecodingError(error.error);
      return;
    }

    dispatch(seInstructor(instructorResult.value));
  };

  const onUpdateInstructorProfile = async (
    instructorData: updateInstructorProfileArgs
  ) => {
    const authenticationResult = await instructorApi.updateAbout({
      headline: instructorData.headline,
      introduction: JSON.stringify(instructorData.introduction),
      teachingExperience: JSON.stringify(instructorData.teachingExperience),
      motivation: JSON.stringify(instructorData.motivation),
      idInstructor: user?.idUser || '',
    });
    console.log('authenticationResult', authenticationResult);
  };
  return {
    //*Properties
    status,
    instructor,
    errorMessage,
    //*Methods
    onGetInstructorConnectedProcess,
    onUpdateInstructorProfile,
  };
};

export default useInstructorStore;
