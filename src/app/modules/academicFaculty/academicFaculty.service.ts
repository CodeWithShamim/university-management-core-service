/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { AcademicFacultySearchableFields } from './academicFaculty.constant';
import { IFilters } from './academicFaculty.interface';

const createAcademicFaculty = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const academicFaculty = await prisma.academicFaculty.create({
    data,
    include: {
      academicDepartments: true,
      students: true,
      faculties: true,
    },
  });
  return academicFaculty;
};

const getAllAcademicFaculty = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(
    filters,
    AcademicFacultySearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      academicDepartments: true,
      students: true,
      faculties: true,
    },
  });

  const total = await prisma.academicFaculty.count({
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

const getSingleAcademicFaculty = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
    include: {
      academicDepartments: true,
      students: true,
      faculties: true,
    },
  });
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  data: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data,
    include: {
      academicDepartments: true,
      students: true,
      faculties: true,
    },
  });
  return result;
};

const deleteAcademicFaculty = async (id: string): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
    include: {
      academicDepartments: true,
      students: true,
      faculties: true,
    },
  });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
