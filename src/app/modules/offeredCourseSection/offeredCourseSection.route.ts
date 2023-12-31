import express, { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';
import { OfferedCourseSectionZodValidation } from './offeredCourseSection.validation';
const router: Router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseSectionZodValidation.create),
  OfferedCourseSectionController.createOfferedCourseSection
);

router.get('/', OfferedCourseSectionController.getAllOfferedCourseSection);
router.get(
  '/:id',
  OfferedCourseSectionController.getSingleOfferedCourseSection
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseSectionZodValidation.update),
  OfferedCourseSectionController.updateOfferedCourseSection
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.deleteOfferedCourseSection
);

export const OfferedCourseSectionRoute = router;
