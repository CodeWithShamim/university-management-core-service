/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { RedisClient } from '../../../shared/redis';
import {
  AcademicSemesterSearchableFields,
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { IFilters } from './academicSemester.interface';

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const academicSemester = await prisma.academicSemester.create({
    data,
    include: {
      students: true,
    },
  });

  // publish data on redis
  if (academicSemester) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEMESTER_CREATED,
      JSON.stringify(academicSemester)
    );
  }

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
    include: {
      students: true,
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
    include: {
      students: true,
    },
  });
  return result;
};

const updateAcademicSemester = async (
  id: string,
  data: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  if (
    data.title &&
    data.code &&
    academicSemesterTitleCodeMapper[data.title] !== data.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data,
    include: {
      students: true,
    },
  });

  // publish data on redis
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEMESTER_UPDATED,
      JSON.stringify(result)
    );
  }

  return result;
};

const deleteAcademicSemester = async (
  id: string
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
    include: {
      students: true,
    },
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
