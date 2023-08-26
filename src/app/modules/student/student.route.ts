import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentZodValidation } from './student.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(StudentZodValidation.create),
  StudentController.createStudent
);

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(StudentZodValidation.update),
  StudentController.updateStudent
);

router.delete('/:id', StudentController.deleteStudent);

export const StudentRoute = router;
