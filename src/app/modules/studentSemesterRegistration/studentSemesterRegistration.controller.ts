/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentSemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentSemesterRegistrationFilterableFields } from './studentSemesterRegistration.constant';
import { StudentSemesterRegistrationService } from './studentSemesterRegistration.service';

const createStudentSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { userId: authUserId } = req.user as any;
    const result =
      await StudentSemesterRegistrationService.createStudentSemesterRegistration(
        authUserId
      );

    sendResponse<StudentSemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester registration created successfully',
      data: result,
    });
  }
);

const getAllStudentSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(
      req.query,
      StudentSemesterRegistrationFilterableFields
    );
    const options = pick(req.query, paginationFields);

    const result =
      await StudentSemesterRegistrationService.getAllStudentSemesterRegistration(
        filters,
        options
      );

    sendResponse<StudentSemesterRegistration[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester registrations retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleStudentSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await StudentSemesterRegistrationService.getSingleStudentSemesterRegistration(
        id
      );

    sendResponse<StudentSemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester registration retrieved successfully',
      data: result,
    });
  }
);

const updateStudentSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result =
      await StudentSemesterRegistrationService.updateStudentSemesterRegistration(
        id,
        data
      );

    sendResponse<StudentSemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester registration updated successfully',
      data: result,
    });
  }
);

const deleteStudentSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await StudentSemesterRegistrationService.deleteStudentSemesterRegistration(
        id
      );

    sendResponse<StudentSemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester registration deleted successfully',
      data: result,
    });
  }
);

export const StudentSemesterRegistrationController = {
  createStudentSemesterRegistration,
  getAllStudentSemesterRegistration,
  getSingleStudentSemesterRegistration,
  updateStudentSemesterRegistration,
  deleteStudentSemesterRegistration,
};
