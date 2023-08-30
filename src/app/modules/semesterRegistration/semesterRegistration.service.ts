/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createSemesterRegistration = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  // ==================
  const findUpcomingOrOngoingSemeserRegistration =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });

  if (findUpcomingOrOngoingSemeserRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${findUpcomingOrOngoingSemeserRegistration.status} registration`
    );
  }

  const SemesterRegistration = await prisma.semesterRegistration.create({
    data,
    include: {
      academicSemester: true,
    },
  });
  return SemesterRegistration;
};

const getAllSemesterRegistration = async (): Promise<
  SemesterRegistration[]
> => {
  const result = await prisma.semesterRegistration.findMany({
    include: {
      academicSemester: true,
    },
  });

  return result;
};

const getSingleSemesterRegistration = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const updateSemesterRegistration = async (
  id: string,
  data: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Semester registration not found.'
    );
  }

  if (
    data.status &&
    isExist.status === SemesterRegistrationStatus.UPCOMING &&
    data.status != SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid status only allow for UPCOMING to INGOING'
    );
  }

  if (
    data.status &&
    isExist.status === SemesterRegistrationStatus.ONGOING &&
    data.status != SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid status only allow for INGOING to ENDED'
    );
  }

  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data,
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const deleteSemesterRegistration = async (
  id: string
): Promise<SemesterRegistration> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
