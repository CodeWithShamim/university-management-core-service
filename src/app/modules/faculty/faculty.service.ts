/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { FacultySearchableFields } from './faculty.constant';
import { IFilters } from './faculty.interface';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const Faculty = await prisma.faculty.create({
    data,
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return Faculty;
};

const getAllFaculty = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(filters, FacultySearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.faculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });

  const total = await prisma.faculty.count({
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

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const updateFaculty = async (
  id: string,
  data: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data,
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<Faculty> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

export const FacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
