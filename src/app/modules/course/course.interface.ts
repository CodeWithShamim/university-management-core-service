export type IFilters = {
  title?: string;
  code?: string;
  searchTerm?: string;
};

export type ICourse = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: { courseId: string }[];
};
