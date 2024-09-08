export type Level = {
  id: string;
  description: string;
};

export type Category = {
  id: string;
  description: string;
};

export type SubCategory = {
  id: string;
  description: string;
  category: Category;
};

export type Requirements = {
  id: string;
  description: string;
};
export type LearningObjective = {
  id: string;
  description: string;
};
export type IntendedLearners = {
  id: string;
  description: string;
};

export type CourseType = {
  id: string;
  title: string;
  idInstructor: string;
  level: Level;
  subCategory: SubCategory;
  description: string;
  imgUrl?: string | null;
  promotionalVideoUrl?: string | null;
  learningObjectives?: LearningObjective[] | [];
  intendedLearners?: IntendedLearners[] | [];
  requirements?: Requirements[] | [];
};
