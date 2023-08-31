import express, { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentSemesterRegistrationController } from './studentSemesterRegistration.controller';
import { StudentSemesterRegistrationZodValidation } from './studentSemesterRegistration.validation';
const router: Router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentSemesterRegistrationZodValidation.create),
  StudentSemesterRegistrationController.createStudentSemesterRegistration
);

router.get(
  '/',
  StudentSemesterRegistrationController.getAllStudentSemesterRegistration
);
router.get(
  '/:id',
  StudentSemesterRegistrationController.getSingleStudentSemesterRegistration
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentSemesterRegistrationZodValidation.update),
  StudentSemesterRegistrationController.updateStudentSemesterRegistration
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentSemesterRegistrationController.deleteStudentSemesterRegistration
);

export const StudentSemesterRegistrationRoute = router;
