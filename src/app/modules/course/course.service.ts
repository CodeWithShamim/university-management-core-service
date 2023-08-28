/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { CourseSearchableFields } from './course.constant';
import { ICourse, IFilters } from './course.interface';

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
      for (let i = 0; i < preRequisiteCourses.length; i++) {
        const preCourse = await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: course.id,
            prerequisiteId: preRequisiteCourses[i].courseId,
          },
        });
        console.log(preCourse, 'preCourse');
      }
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

      for (let i = 0; i < deletedRrerequisites.length; i++) {
        const deleteOldRrerequisites = await tx.courseToPrerequisite.deleteMany(
          {
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  prerequisiteId: deletedRrerequisites[i].courseId,
                },
              ],
            },
          }
        );

        console.log({ deleteOldRrerequisites });
      }

      try {
        for (let i = 0; i < newRrerequisites.length; i++) {
          const addedNewRrerequisites = await tx.courseToPrerequisite.create({
            data: {
              courseId: id,
              prerequisiteId: newRrerequisites[i].courseId,
            },
          });

          console.log({ addedNewRrerequisites });
        }
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
      for (let i = 0; i < findCourse.prerequisite.length; i++) {
        const delPrerequisite = await tx.courseToPrerequisite.deleteMany({
          where: {
            AND: [
              {
                courseId: id,
              },
              {
                prerequisiteId: findCourse.prerequisite[i].prerequisiteId,
              },
            ],
          },
        });

        console.log({ delPrerequisite });
      }
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

export const CourseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
