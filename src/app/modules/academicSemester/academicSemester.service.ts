import { AcademicSemester } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const academicSemester = await prisma.academicSemester.create({
    data,
  });
  return academicSemester;
};

const getAllAcademicSemester = async (): Promise<AcademicSemester[]> => {
  const result = await prisma.academicSemester.findMany({});
  return result;
};

const getSingleAcademicSemester = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
};
