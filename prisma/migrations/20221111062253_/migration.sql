/*
  Warnings:

  - You are about to drop the column `semeter` on the `SubjectClass` table. All the data in the column will be lost.
  - Added the required column `semester` to the `SubjectClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubjectClass" DROP COLUMN "semeter",
ADD COLUMN     "semester" TEXT NOT NULL;
