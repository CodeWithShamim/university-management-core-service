/* eslint-disable @typescript-eslint/no-explicit-any */
import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBuilding = async (data: Building): Promise<Building> => {
  const Building = await prisma.building.create({
    data,
    include: {
      rooms: true,
    },
  });
  return Building;
};

const getAllBuilding = async (): Promise<Building[]> => {
  const result = await prisma.building.findMany({
    include: {
      rooms: true,
    },
  });

  return result;
};

const getSingleBuilding = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
    include: {
      rooms: true,
    },
  });
  return result;
};

const updateBuilding = async (
  id: string,
  data: Partial<Building>
): Promise<Building> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data,
    include: {
      rooms: true,
    },
  });
  return result;
};

const deleteBuilding = async (id: string): Promise<Building> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
    include: {
      rooms: true,
    },
  });
  return result;
};

export const BuildingService = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  updateBuilding,
  deleteBuilding,
};
