import { InstructorType } from '../store/instructor/instructor.types';
import { AxiosHttpClient } from '../utils/adpters/axios-http-client';
import getEnvVariable from '../utils/envs/enviroments';

const httpClient = new AxiosHttpClient(getEnvVariable().AUTH_API_URL!);
const basePath = '/api/instructor';

type updateAboutParams = {
  introductionText: string;
  teachingExperienceText: string;
  motivationText: string;
  idInstructor: string;
};

export const instructorApi = {
  getProfileInstructor: async () => {
    return await httpClient.get<InstructorType>(`${basePath}/profile`);
  },

  updateAbout: async ({
    introductionText,
    teachingExperienceText,
    motivationText,
    idInstructor,
  }: updateAboutParams) => {
    const data = {
      introductionText,
      teachingExperienceText,
      motivationText,
    };
    console.log();

    return await httpClient.put<void>(
      `${basePath}/about/${idInstructor}`,
      data
    );
  },
};
