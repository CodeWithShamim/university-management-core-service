/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { AcademicDepartmentSearchableFields } from './academicDepartment.constant';
import { IFilters } from './academicDepartment.interface';

const createAcademicDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const academicDepartment = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
      students: true,
      faculties: true,
    },
  });
  return academicDepartment;
};

const getAllAcademicDepartment = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(
    filters,
    AcademicDepartmentSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.academicDepartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      academicFaculty: true,
      students: true,
      faculties: true,
    },
  });

  const total = await prisma.academicDepartment.count({
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

const getSingleAcademicDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      students: true,
      faculties: true,
    },
  });
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  data: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data,
    include: {
      academicFaculty: true,
      students: true,
      faculties: true,
    },
  });
  return result;
};

const deleteAcademicDepartment = async (
  id: string
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      students: true,
      faculties: true,
    },
  });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
