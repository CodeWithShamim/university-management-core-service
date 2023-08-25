import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemester.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterZodValidation.create),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoute = router;
