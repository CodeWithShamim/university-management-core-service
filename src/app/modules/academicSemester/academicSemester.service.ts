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

export const AcademicSemesterService = {
  createAcademicSemester,
};
