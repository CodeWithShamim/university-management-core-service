import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title id is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const BuildingZodValidation = {
  create,
  update,
};
