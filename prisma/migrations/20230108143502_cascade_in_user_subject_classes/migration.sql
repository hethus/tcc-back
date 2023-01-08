-- DropForeignKey
ALTER TABLE "UsersSubjectClasses" DROP CONSTRAINT "UsersSubjectClasses_subjectClassId_fkey";

-- DropForeignKey
ALTER TABLE "UsersSubjectClasses" DROP CONSTRAINT "UsersSubjectClasses_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_subjectClassId_fkey" FOREIGN KEY ("subjectClassId") REFERENCES "SubjectClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
