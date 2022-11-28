/*
  Warnings:

  - You are about to drop the column `isTemplate` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `exhibitionMode` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Question` table. All the data in the column will be lost.
  - Added the required column `random` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `random` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "isTemplate",
DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "random" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "exhibitionMode",
DROP COLUMN "feedback",
ADD COLUMN     "random" BOOLEAN NOT NULL;
