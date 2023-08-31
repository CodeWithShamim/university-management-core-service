import { z } from 'zod';

const create = z.object({
  body: z.object({
    // semesterRegistrationId: z
    //   .string({
    //     required_error: 'Semester registration id is required.',
    //   })
    //   .nonempty(),
    // studentId: z
    //   .string({
    //     required_error: 'Student id is required.',
    //   })
    //   .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    // semesterRegistrationId: z.string().optional(),
    // studentId: z.string().optional(),
  }),
});

export const StudentSemesterRegistrationZodValidation = {
  create,
  update,
};
