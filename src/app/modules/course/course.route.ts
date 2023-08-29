import express, { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseZodValidation } from './course.validation';
const router: Router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseZodValidation.create),
  CourseController.createCourse
);

router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseZodValidation.update),
  CourseController.updateCourse
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.deleteCourse
);

router.post(
  '/:id/assign-faculties',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.assignFaculties
);

export const CourseRoute = router;
