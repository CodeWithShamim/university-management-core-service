import { z } from 'zod';

const create = z.object({
  body: z.object({
    courseIds: z.array(
      z.string({
        required_error: 'Course id is required.',
      })
    ),
    academicDepartmentId: z
      .string({
        required_error: 'Academic department id required.',
      })
      .nonempty(),
    semesterRegistrationId: z
      .string({
        required_error: 'Semester registration id is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    courseIds: z.array(z.string()).optional(),
    academicDepartmentId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
  }),
});

export const OfferedCourseZodValidation = {
  create,
  update,
};
