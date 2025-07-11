export const USER_TYPES = {
  LEARNER: 'learner',
  MENTOR: 'mentor',
  RECRUITER: 'recruiter'
} as const;

export const COURSE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const;

export const JOB_TYPES = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship'
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];
export type CourseStatus = typeof COURSE_STATUS[keyof typeof COURSE_STATUS];
export type JobType = typeof JOB_TYPES[keyof typeof JOB_TYPES];