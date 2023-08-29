/*
  Warnings:

  - You are about to drop the column `endMonth` on the `semester_registration` table. All the data in the column will be lost.
  - You are about to drop the column `startMonth` on the `semester_registration` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `semester_registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `semester_registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "semester_registration" DROP COLUMN "endMonth",
DROP COLUMN "startMonth",
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
