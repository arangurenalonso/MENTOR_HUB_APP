export type SocialMediaDomainType = {
  id: string;
  description: string;
  baseUrl: string;
  urlmage: string | null;
  urlProfile: string;
  idRelation: string | null;
};
export type DayOfWeekDomainType = {
  id: string;
  dayIndex: number;
  dayName: string;
};
export type TimeOptionDomainType = {
  id: string;
  value: string;
  index: number;
};
export type InstructorAvailabilityDomainType = {
  id: string;
  dayOfWeek: DayOfWeekDomainType;
  startTime: TimeOptionDomainType;
  finalTime: TimeOptionDomainType;
};
export type InstructorType = {
  id: string;
  websideURL: string | null;
  headline: string | null;
  socialMedia: SocialMediaDomainType[];
  introductionText: string | null;
  teachingExperienceText: string | null;
  motivationText: string | null;
  availability: InstructorAvailabilityDomainType[];
};
