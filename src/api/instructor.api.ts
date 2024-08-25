import { InstructorType } from '../store/instructor/instructor.types';
import { AxiosHttpClient } from '../utils/adpters/axios-http-client';
import getEnvVariable from '../utils/envs/enviroments';

const httpClient = new AxiosHttpClient(getEnvVariable().AUTH_API_URL!);
const basePath = '/api/instructor';

type updateAboutParams = {
  headline: string;
  introduction: string;
  teachingExperience: string;
  motivation: string;
  idInstructor: string;
};

export const instructorApi = {
  getProfileInstructor: async () => {
    return await httpClient.get<InstructorType>(`${basePath}/profile`);
  },

  updateAbout: async ({
    headline,
    introduction,
    teachingExperience,
    motivation,
    idInstructor,
  }: updateAboutParams) => {
    const data = {
      headline,
      introduction,
      teachingExperience,
      motivation,
    };
    console.log();

    return await httpClient.put<void>(
      `${basePath}/profile/${idInstructor}`,
      data
    );
  },
};
