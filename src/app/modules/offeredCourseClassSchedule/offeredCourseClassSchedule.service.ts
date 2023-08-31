/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourseClassSchedule } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { OfferedCourseClassScheduleSearchableFields } from './offeredCourseClassSchedule.constant';
import { IFilters } from './offeredCourseClassSchedule.interface';
import { OfferedCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';

const createOfferedCourseClassSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await OfferedCourseClassScheduleUtils.checkRoomAvailable(data);
  await OfferedCourseClassScheduleUtils.checkFacultyAvailable(data);

  const OfferedCourseClassSchedule =
    await prisma.offeredCourseClassSchedule.create({
      data,
      include: {
        offeredCourseSection: true,
        semesterRegistration: true,
        room: true,
        faculty: true,
      },
    });
  return OfferedCourseClassSchedule;
};

const getAllOfferedCourseClassSchedule = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(
    filters,
    OfferedCourseClassScheduleSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.offeredCourseClassSchedule.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      offeredCourseSection: true,
      semesterRegistration: true,
      room: true,
      faculty: true,
    },
  });

  const total = await prisma.offeredCourseClassSchedule.count({
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

const getSingleOfferedCourseClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourseSection: true,
      semesterRegistration: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

const updateOfferedCourseClassSchedule = async (
  id: string,
  data: Partial<OfferedCourseClassSchedule>
): Promise<OfferedCourseClassSchedule> => {
  const result = await prisma.offeredCourseClassSchedule.update({
    where: {
      id,
    },
    data,
    include: {
      offeredCourseSection: true,
      semesterRegistration: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

const deleteOfferedCourseClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule> => {
  const result = await prisma.offeredCourseClassSchedule.delete({
    where: {
      id,
    },
    include: {
      offeredCourseSection: true,
      semesterRegistration: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  updateOfferedCourseClassSchedule,
  deleteOfferedCourseClassSchedule,
};
