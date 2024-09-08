import { CourseType } from '../store/course/course.type';
import { AxiosHttpClient } from '../utils/adpters/axios-http-client';
import getEnvVariable from '../utils/envs/enviroments';

const httpClient = new AxiosHttpClient(getEnvVariable().AUTH_API_URL!);
const basePath = '/api/course';

type createCourseParams = {
  title: string;
  description: string;
  idSubCategory: string;
  idLevel: string;
};

export const courseApi = {
  getCoursesByInstructorConnected: async () => {
    return await httpClient.get<CourseType[]>(`${basePath}/profile`);
  },

  createCourse: async ({
    title,
    description,
    idSubCategory,
    idLevel,
  }: createCourseParams) => {
    const data = {
      title,
      description,
      idSubCategory,
      idLevel,
    };
    return await httpClient.postJson<string>(`${basePath}`, data);
  },
};
