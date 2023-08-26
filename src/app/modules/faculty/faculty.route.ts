import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyZodValidation } from './faculty.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(FacultyZodValidation.create),
  FacultyController.createFaculty
);

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyZodValidation.update),
  FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoute = router;
