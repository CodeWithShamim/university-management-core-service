import { WeekDays } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startTime: z
      .string({
        required_error: 'Start time is required.',
      })
      .nonempty(),
    endTime: z
      .string({
        required_error: 'End time is required.',
      })
      .nonempty(),
    dayOfWeek: z.enum([...Object.values(WeekDays)] as [string, ...string[]], {
      required_error: 'Day of week is required',
    }),
    offeredCourseSectionId: z
      .string({
        required_error: 'Offered course section id is required.',
      })
      .nonempty(),
    semesterRegistrationId: z
      .string({
        required_error: 'Semester registration id is required.',
      })
      .nonempty(),
    roomId: z
      .string({
        required_error: 'Room id is required.',
      })
      .nonempty(),
    facultyid: z
      .string({
        required_error: 'Faculty id is required.',
      })
      .nonempty(),
  }),
});

const update = z.object({
  body: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    dayOfWeek: z
      .enum([...Object.values(WeekDays)] as [string, ...string[]])
      .optional(),
    offeredCourseSectionId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
    roomId: z.string().optional(),
    facultyid: z.string().optional(),
  }),
});

export const OfferedCourseClassScheduleZodValidation = {
  create,
  update,
};
