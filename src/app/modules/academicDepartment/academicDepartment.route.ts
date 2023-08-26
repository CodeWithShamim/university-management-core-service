import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentZodValidation } from './academicDepartment.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(AcademicDepartmentZodValidation.create),
  AcademicDepartmentController.createAcademicDepartment
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentZodValidation.update),
  AcademicDepartmentController.updateAcademicDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoute = router;
