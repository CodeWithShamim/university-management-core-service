import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required.',
      })
      .nonempty(),
    year: z.number({
      required_error: 'Year is required.',
    }),
    code: z
      .string({
        required_error: 'Code is required.',
      })
      .nonempty(),
    startMonth: z
      .string({
        required_error: 'Start month is required.',
      })
      .nonempty(),
    endMonth: z
      .string({
        required_error: 'End month is required.',
      })
      .nonempty(),
  }),
});

export const AcademicSemesterZodValidation = {
  create,
};
