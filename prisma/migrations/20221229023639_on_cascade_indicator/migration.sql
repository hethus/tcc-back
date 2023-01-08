-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_indicatorId_fkey";

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
