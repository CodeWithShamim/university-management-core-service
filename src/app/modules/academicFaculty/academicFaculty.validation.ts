import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const AcademicFacultyZodValidation = {
  create,
  update,
};
