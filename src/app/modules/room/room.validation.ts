import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z
      .string({
        required_error: 'Room number is required.',
      })
      .nonempty(),
    floor: z
      .string({
        required_error: 'Floor is required.',
      })
      .nonempty(),
    buildingId: z
      .string({
        required_error: 'Building id is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    roomNumber: z.string().optional(),
    floor: z.string().optional(),
    buildingId: z.string().optional(),
  }),
});

export const RoomZodValidation = {
  create,
  update,
};
