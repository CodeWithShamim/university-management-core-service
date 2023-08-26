import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodValidation } from './academicFaculty.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(AcademicFacultyZodValidation.create),
  AcademicFacultyController.createAcademicFaculty
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyZodValidation.update),
  AcademicFacultyController.updateAcademicFaculty
);

router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRoute = router;
