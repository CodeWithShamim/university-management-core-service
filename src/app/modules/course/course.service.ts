/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, CourseFaculty } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { CourseSearchableFields } from './course.constant';
import { ICourse, IFilters, IPrerequisite } from './course.interface';

const createCourse = async (data: ICourse): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const course = await transactionClient.course.create({
      data: courseData,
    });

    if (!course?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Course created failed.');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      await asyncForEach(
        preRequisiteCourses,
        async (prerequisite: IPrerequisite) => {
          const preCourse = await transactionClient.courseToPrerequisite.create(
            {
              data: {
                courseId: course.id,
                prerequisiteId: prerequisite.courseId,
              },
            }
          );
          console.log(preCourse, 'preCourse');
        }
      );
    }

    return course;
  });

  return await prisma.course.findUnique({
    where: {
      id: newCourse.id,
    },
    include: {
      prerequisite: {
        include: {
          prerequisite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
};

const getAllCourse = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(filters, CourseSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.course.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      prerequisite: {
        include: {
          prerequisite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  const total = await prisma.course.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      prerequisite: {
        include: {
          prerequisite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const updateCourse = async (
  id: string,
  data: Partial<ICourse>
): Promise<Course> => {
  const { preRequisiteCourses, ...courseData } = data;

  const result = await prisma.$transaction(async tx => {
    const result = await tx.course.update({
      where: {
        id,
      },
      data: courseData,
      include: {
        prerequisite: {
          include: {
            prerequisite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter delete prequisite
      const deletedRrerequisites = preRequisiteCourses.filter(
        prerequisite => prerequisite.courseId && prerequisite.isDeleted
      );

      const newRrerequisites = preRequisiteCourses.filter(
        prerequisite => prerequisite.courseId && !prerequisite.isDeleted
      );

      // console.log({ deletedRrerequisites });
      // console.log({ newRrerequisites });

      await asyncForEach(
        deletedRrerequisites,
        async (prerequisite: IPrerequisite) => {
          const deleteOldRrerequisites =
            await tx.courseToPrerequisite.deleteMany({
              where: {
                AND: [
                  {
                    courseId: id,
                  },
                  {
                    prerequisiteId: prerequisite.courseId,
                  },
                ],
              },
            });

          console.log({ deleteOldRrerequisites });
        }
      );

      try {
        await asyncForEach(
          newRrerequisites,
          async (prerequisite: IPrerequisite) => {
            const addedNewRrerequisites = await tx.courseToPrerequisite.create({
              data: {
                courseId: id,
                prerequisiteId: prerequisite.courseId,
              },
            });

            console.log({ addedNewRrerequisites });
          }
        );
      } catch (error) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'This coures & prerequisite already exists.'
        );
      }
    }

    return result;
  });
  return result;
};

const deleteCourse = async (id: string): Promise<Course> => {
  // step-1
  const result = prisma.$transaction(async tx => {
    const findCourse = await tx.course.findUnique({
      where: {
        id,
      },
      include: {
        prerequisite: {
          include: {
            prerequisite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!findCourse?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to find course');
    }

    // step-2
    if (findCourse.prerequisite.length > 0) {
      await asyncForEach(findCourse.prerequisite, async (prerequisite: any) => {
        const delPrerequisite = await tx.courseToPrerequisite.deleteMany({
          where: {
            AND: [
              {
                courseId: id,
              },
              {
                prerequisiteId: prerequisite.prerequisiteId,
              },
            ],
          },
        });

        console.log({ delPrerequisite });
      });
    }

    // step-3
    const delCourseToPrerequisite = await tx.course.delete({
      where: {
        id,
      },
      include: {
        prerequisite: {
          include: {
            prerequisite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return delCourseToPrerequisite;
  });

  return result;
};

const assignFaculties = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  const createCourseFaculty = await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId: facultyId,
    })),
  });

  if (!createCourseFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to assign faculties.');
  }

  const result = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      course: true,
      faculty: true,
    },
  });

  return result;
};

export const CourseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
};
