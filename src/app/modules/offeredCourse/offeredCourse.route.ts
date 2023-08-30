import express, { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseZodValidation } from './offeredCourse.validation';
const router: Router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseZodValidation.create),
  OfferedCourseController.createOfferedCourse
);

router.get('/', OfferedCourseController.getAllOfferedCourse);
router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseZodValidation.update),
  OfferedCourseController.updateOfferedCourse
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.deleteOfferedCourse
);

export const OfferedCourseRoute = router;
