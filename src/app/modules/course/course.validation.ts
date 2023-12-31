import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required.',
      })
      .nonempty(),
    code: z
      .string({
        required_error: 'Code is required.',
      })
      .nonempty(),
    credits: z.number({
      required_error: 'Credits is required.',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string({
            required_error: 'CouresId is required',
          }),
          isDeleted: z.boolean().optional(),
        })
      )
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string(),
          isDeleted: z.boolean().optional(),
        })
      )
      .optional(),
  }),
});

const assignOrRemoveFaculties = z.object({
  body: z.object({
    faculties: z.array(z.string(), {
      required_error: 'Faculties is required',
    }),
  }),
});

export const CourseZodValidation = {
  create,
  update,
  assignOrRemoveFaculties,
};
