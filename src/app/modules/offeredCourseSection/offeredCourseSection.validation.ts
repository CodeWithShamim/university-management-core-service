import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required.',
    }),
    maxCapacity: z.number({
      required_error: 'Max capacity is required.',
    }),
    offeredCourseId: z
      .string({
        required_error: 'Offer course id is required.',
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
    title: z.string().optional(),
    maxCapacity: z.number().optional(),
    offeredCourseId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
  }),
});

export const OfferedCourseSectionZodValidation = {
  create,
  update,
};
