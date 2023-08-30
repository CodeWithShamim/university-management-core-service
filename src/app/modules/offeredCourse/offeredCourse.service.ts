/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourse } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IOfferedCourse } from './offeredCourse.interface';

const createOfferedCourse = async (
  data: IOfferedCourse
): Promise<OfferedCourse> => {
  const { courseIds, semesterRegistrationId, academicDepartmentId } = data;

  const result: any = [];
  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        courseId,
        semesterRegistrationId,
        academicDepartmentId,
      },
    });

    if (alreadyExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'This offeredcoure data already exist!'
      );
    }

    const OfferedCourse = await prisma.offeredCourse.create({
      data: {
        courseId: courseId,
        semesterRegistrationId: semesterRegistrationId,
        academicDepartmentId: academicDepartmentId,
      },
      include: {
        course: true,
        semesterRegistration: true,
        academicDepartment: true,
      },
    });

    result.push(OfferedCourse);
  });

  return result;
};

const getAllOfferedCourse = async (): Promise<OfferedCourse[]> => {
  const result = await prisma.offeredCourse.findMany({
    include: {
      course: true,
      semesterRegistration: true,
      academicDepartment: true,
    },
  });

  return result;
};

const getSingleOfferedCourse = async (
  id: string
): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
      semesterRegistration: true,
      academicDepartment: true,
    },
  });
  return result;
};

const updateOfferedCourse = async (
  id: string,
  data: Partial<OfferedCourse>
): Promise<OfferedCourse> => {
  const result = await prisma.offeredCourse.update({
    where: {
      id,
    },
    data,
    include: {
      course: true,
      semesterRegistration: true,
      academicDepartment: true,
    },
  });
  return result;
};

const deleteOfferedCourse = async (id: string): Promise<OfferedCourse> => {
  const result = await prisma.offeredCourse.delete({
    where: {
      id,
    },
    include: {
      course: true,
      semesterRegistration: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
