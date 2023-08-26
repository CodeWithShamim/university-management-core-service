import { z } from 'zod';

const create = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: 'Student id is required.',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'Profile image is required.',
      })
      .optional(),
    firstName: z
      .string({
        required_error: 'First name is required.',
      })
      .optional(),
    middleName: z.string().optional(),
    lastName: z
      .string({
        required_error: 'Last name is required.',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .optional(),
    contactNO: z
      .string({
        required_error: 'Contact number is required.',
      })
      .optional(),
    gender: z
      .string({
        required_error: 'Gender is required.',
      })
      .optional(),
    bloodGroup: z
      .string({
        required_error: 'Blood group is required.',
      })
      .optional(),
    academicSemesterId: z
      .string({
        required_error: 'Academic semester id is required.',
      })
      .optional(),
    academicDepartmentId: z
      .string({
        required_error: 'Academic department id is required.',
      })
      .optional(),
    academicFacultyId: z
      .string({
        required_error: 'Academic faculty id is required.',
      })
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    studentId: z.string().optional(),
    profileImage: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    contactNO: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicSemesterId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const StudentZodValidation = {
  create,
  update,
};
