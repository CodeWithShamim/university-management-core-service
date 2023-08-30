/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOfferedCourse = async (
  data: OfferedCourse
): Promise<OfferedCourse> => {
  const OfferedCourse = await prisma.offeredCourse.create({
    data,
    include: {
      course: true,
      semesterRegistration: true,
      academicDepartment: true,
    },
  });
  return OfferedCourse;
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
