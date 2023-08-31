import { WeekDays } from '@prisma/client';

export type IFilters = {
  startTime?: string;
  endTime?: string;
  dayOfWeek?: WeekDays;
  offeredCourseSectionId?: string;
  semesterRegistrationId?: string;
  roomId?: string;
  facultyid?: string;
  searchTerm?: string;
};
