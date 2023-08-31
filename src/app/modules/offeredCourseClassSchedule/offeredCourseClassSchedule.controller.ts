import { OfferedCourseClassSchedule } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassScheduleFilterableFields } from './offeredCourseClassSchedule.constant';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const createOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result =
      await OfferedCourseClassScheduleService.createOfferedCourseClassSchedule(
        data
      );

    sendResponse<OfferedCourseClassSchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course class schedule created successfully',
      data: result,
    });
  }
);

const getAllOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, OfferedCourseClassScheduleFilterableFields);
    const options = pick(req.query, paginationFields);

    const result =
      await OfferedCourseClassScheduleService.getAllOfferedCourseClassSchedule(
        filters,
        options
      );

    sendResponse<OfferedCourseClassSchedule[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course class schedules retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await OfferedCourseClassScheduleService.getSingleOfferedCourseClassSchedule(
        id
      );

    sendResponse<OfferedCourseClassSchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course class schedule retrieved successfully',
      data: result,
    });
  }
);

const updateOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result =
      await OfferedCourseClassScheduleService.updateOfferedCourseClassSchedule(
        id,
        data
      );

    sendResponse<OfferedCourseClassSchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course class schedule updated successfully',
      data: result,
    });
  }
);

const deleteOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await OfferedCourseClassScheduleService.deleteOfferedCourseClassSchedule(
        id
      );

    sendResponse<OfferedCourseClassSchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course class schedule deleted successfully',
      data: result,
    });
  }
);

export const OfferedCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  updateOfferedCourseClassSchedule,
  deleteOfferedCourseClassSchedule,
};
