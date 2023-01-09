/*
  Warnings:

  - You are about to drop the `FormIndicator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Indicator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Indicator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `methodologyId` to the `Indicator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Indicator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Indicator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormIndicator" DROP CONSTRAINT "FormIndicator_classId_fkey";

-- DropForeignKey
ALTER TABLE "FormIndicator" DROP CONSTRAINT "FormIndicator_indicatorId_fkey";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "indicatorId" UUID;

-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "groupId" UUID NOT NULL,
ADD COLUMN     "methodologyId" UUID NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- DropTable
DROP TABLE "FormIndicator";

-- CreateTable
CREATE TABLE "Methodology" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Methodology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "formId" UUID NOT NULL,
    "indicatorId" UUID NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "classId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "evaluationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Methodology_label_key" ON "Methodology"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Group_label_key" ON "Group"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_formId_key" ON "Evaluation"("formId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Methodology" ADD CONSTRAINT "Methodology_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_methodologyId_fkey" FOREIGN KEY ("methodologyId") REFERENCES "Methodology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_classId_fkey" FOREIGN KEY ("classId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
