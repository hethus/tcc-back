/*
  Warnings:

  - Added the required column `repeat` to the `Evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluations" ADD COLUMN     "repeat" JSONB NOT NULL;
