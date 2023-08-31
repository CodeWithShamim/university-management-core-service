/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourseSection } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOfferedCourseSection = async (
  data: OfferedCourseSection
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.create({
    data,
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });

  return result;
};

const getAllOfferedCourseSection = async (): Promise<
  OfferedCourseSection[]
> => {
  const result = await prisma.offeredCourseSection.findMany({
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });

  return result;
};

const getSingleOfferedCourseSection = async (
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });
  return result;
};

const updateOfferedCourseSection = async (
  id: string,
  data: Partial<OfferedCourseSection>
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.update({
    where: {
      id,
    },
    data,
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });
  return result;
};

const deleteOfferedCourseSection = async (
  id: string
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.delete({
    where: {
      id,
    },
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });
  return result;
};

export const OfferedCourseSectionService = {
  createOfferedCourseSection,
  getAllOfferedCourseSection,
  getSingleOfferedCourseSection,
  updateOfferedCourseSection,
  deleteOfferedCourseSection,
};
