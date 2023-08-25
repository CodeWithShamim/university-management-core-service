import express, { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
const router: Router = express.Router();

router.post('/', AcademicSemesterController.createAcademicSemester);

export const AcademicSemesterRoute = router;
