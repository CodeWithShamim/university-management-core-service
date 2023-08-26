import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyFilterableFields } from './academicFaculty.constant';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(data);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicFacultyFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await AcademicFacultyService.getAllAcademicFaculty(
      filters,
      options
    );

    sendResponse<AcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Facultys retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      data: result,
    });
  }
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(id, data);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(id);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
