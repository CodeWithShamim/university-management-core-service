export type IFilters = {
  title?: string;
  code?: string;
  searchTerm?: string;
};

export type IPrerequisite = {
  courseId: string;
  isDeleted?: boolean;
};

export type ICourse = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: IPrerequisite[];
};
