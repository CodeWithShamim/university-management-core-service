/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentSemesterRegistration } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { StudentSemesterRegistrationSearchableFields } from './studentSemesterRegistration.constant';
import { IFilters } from './studentSemesterRegistration.interface';

const createStudentSemesterRegistration = async (
  data: StudentSemesterRegistration
): Promise<StudentSemesterRegistration> => {
  const isExistRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistrationId: data.semesterRegistrationId,
        studentId: data.studentId,
      },
    });

  if (isExistRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already register this semester!'
    );
  }

  const StudentSemesterRegistration =
    await prisma.studentSemesterRegistration.create({
      data,
      include: {
        semesterRegistration: true,
        student: true,
      },
    });
  return StudentSemesterRegistration;
};

const getAllStudentSemesterRegistration = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<StudentSemesterRegistration[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(
    filters,
    StudentSemesterRegistrationSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.studentSemesterRegistration.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      semesterRegistration: true,
      student: true,
    },
  });

  const total = await prisma.studentSemesterRegistration.count({
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

const getSingleStudentSemesterRegistration = async (
  id: string
): Promise<StudentSemesterRegistration | null> => {
  const result = await prisma.studentSemesterRegistration.findUnique({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      student: true,
    },
  });
  return result;
};

const updateStudentSemesterRegistration = async (
  id: string,
  data: Partial<StudentSemesterRegistration>
): Promise<StudentSemesterRegistration> => {
  const result = await prisma.studentSemesterRegistration.update({
    where: {
      id,
    },
    data,
    include: {
      semesterRegistration: true,
      student: true,
    },
  });
  return result;
};

const deleteStudentSemesterRegistration = async (
  id: string
): Promise<StudentSemesterRegistration> => {
  const result = await prisma.studentSemesterRegistration.delete({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      student: true,
    },
  });
  return result;
};

export const StudentSemesterRegistrationService = {
  createStudentSemesterRegistration,
  getAllStudentSemesterRegistration,
  getSingleStudentSemesterRegistration,
  updateStudentSemesterRegistration,
  deleteStudentSemesterRegistration,
};
