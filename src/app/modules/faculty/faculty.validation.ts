import { z } from 'zod';

const create = z.object({
  body: z.object({
    facultyId: z
      .string({
        required_error: 'Faculty id is required.',
      })
      .nonempty(),
    profileImage: z
      .string({
        required_error: 'Profile image is required.',
      })
      .nonempty(),
    firstName: z
      .string({
        required_error: 'First name is required.',
      })
      .nonempty(),
    middleName: z.string().optional(),
    lastName: z
      .string({
        required_error: 'Last name is required.',
      })
      .nonempty(),
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .nonempty(),
    contactNO: z
      .string({
        required_error: 'Contact number is required.',
      })
      .nonempty(),
    gender: z
      .string({
        required_error: 'Gender is required.',
      })
      .nonempty(),
    bloodGroup: z
      .string({
        required_error: 'Blood group is required.',
      })
      .nonempty(),
    designation: z
      .string({
        required_error: 'Designation id is required.',
      })
      .nonempty(),
    academicDepartmentId: z
      .string({
        required_error: 'Academic department id is required.',
      })
      .nonempty(),
    academicFacultyId: z
      .string({
        required_error: 'Academic faculty id is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    facultyId: z.string().optional(),
    profileImage: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    contactNO: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    designation: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const FacultyZodValidation = {
  create,
  update,
};
