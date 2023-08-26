import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required.',
      })
      .nonempty(),
    academicFacultyId: z
      .string({
        required_error: 'Academic faculty is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const AcademicDepartmentZodValidation = {
  create,
  update,
};
