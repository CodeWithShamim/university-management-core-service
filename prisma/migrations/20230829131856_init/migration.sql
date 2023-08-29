/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseToPrerequisite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_prerequisiteId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "CourseToPrerequisite";

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_to_prerequisities" (
    "courseId" TEXT NOT NULL,
    "prerequisiteId" TEXT NOT NULL,

    CONSTRAINT "course_to_prerequisities_pkey" PRIMARY KEY ("courseId","prerequisiteId")
);

-- CreateTable
CREATE TABLE "course_faculties" (
    "courseId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "course_faculties_pkey" PRIMARY KEY ("courseId","facultyId")
);

-- AddForeignKey
ALTER TABLE "course_to_prerequisities" ADD CONSTRAINT "course_to_prerequisities_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_to_prerequisities" ADD CONSTRAINT "course_to_prerequisities_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faculties" ADD CONSTRAINT "course_faculties_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faculties" ADD CONSTRAINT "course_faculties_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
