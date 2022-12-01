/*
  Warnings:

  - You are about to drop the `UserGivenClasses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teacherId` to the `SubjectClass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserGivenClasses" DROP CONSTRAINT "UserGivenClasses_givenClassId_fkey";

-- DropForeignKey
ALTER TABLE "UserGivenClasses" DROP CONSTRAINT "UserGivenClasses_userId_fkey";

-- AlterTable
ALTER TABLE "SubjectClass" ADD COLUMN     "teacherId" UUID NOT NULL;

-- DropTable
DROP TABLE "UserGivenClasses";

-- AddForeignKey
ALTER TABLE "SubjectClass" ADD CONSTRAINT "SubjectClass_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
