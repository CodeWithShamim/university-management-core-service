/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { AcademicSemesterSearchableFields } from './academicSemester.constant';
import { IFilters } from './academicSemester.interface';

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const academicSemester = await prisma.academicSemester.create({
    data,
  });
  return academicSemester;
};

const getAllAcademicSemester = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(
    filters,
    AcademicSemesterSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.academicSemester.count({
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
