/* eslint-disable @typescript-eslint/no-explicit-any */
import { WeekDays } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

export const asyncForEach = async (array: any, callback: any) => {
  if (!Array.isArray(array)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Expected array.');
  }

  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};

type ISlot = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
};

export const hasTimeConflict = (existingSlots: ISlot[], newSlot: ISlot) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);


    // 10-11
    
    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
