/*
  Warnings:

  - The primary key for the `UsersSubjectClasses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UsersSubjectClasses" DROP CONSTRAINT "UsersSubjectClasses_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "UsersSubjectClasses_pkey" PRIMARY KEY ("id");
