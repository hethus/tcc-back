-- DropForeignKey
ALTER TABLE "Evaluations" DROP CONSTRAINT "Evaluations_formId_fkey";

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
