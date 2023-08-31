import { OfferedCourseSection } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const createOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await OfferedCourseSectionService.createOfferedCourseSection(
      data
    );

    sendResponse<OfferedCourseSection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section created successfully',
      data: result,
    });
  }
);

const getAllOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OfferedCourseSectionService.getAllOfferedCourseSection();

    sendResponse<OfferedCourseSection[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course sections retrieved successfully',
      data: result,
    });
  }
);

const getSingleOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await OfferedCourseSectionService.getSingleOfferedCourseSection(id);

    sendResponse<OfferedCourseSection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section retrieved successfully',
      data: result,
    });
  }
);

const updateOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await OfferedCourseSectionService.updateOfferedCourseSection(
      id,
      data
    );

    sendResponse<OfferedCourseSection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section updated successfully',
      data: result,
    });
  }
);

const deleteOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await OfferedCourseSectionService.deleteOfferedCourseSection(
      id
    );

    sendResponse<OfferedCourseSection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section deleted successfully',
      data: result,
    });
  }
);

export const OfferedCourseSectionController = {
  createOfferedCourseSection,
  getAllOfferedCourseSection,
  getSingleOfferedCourseSection,
  updateOfferedCourseSection,
  deleteOfferedCourseSection,
};
