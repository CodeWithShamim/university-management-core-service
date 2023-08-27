/* eslint-disable @typescript-eslint/no-explicit-any */
import { Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { RoomSearchableFields } from './room.constant';
import { IFilters } from './room.interface';

const createRoom = async (data: Room): Promise<Room> => {
  const Room = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return Room;
};

const getAllRoom = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(filters, RoomSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.room.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      building: true,
    },
  });

  const total = await prisma.room.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleRoom = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });
  return result;
};

const updateRoom = async (id: string, data: Partial<Room>): Promise<Room> => {
  const result = await prisma.room.update({
    where: {
      id,
    },
    data,
    include: {
      building: true,
    },
  });
  return result;
};

const deleteRoom = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });
  return result;
};

export const RoomService = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
