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

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    year: z.number().optional(),
    code: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  }),
});

export const AcademicSemesterZodValidation = {
  create,
  update,
};
