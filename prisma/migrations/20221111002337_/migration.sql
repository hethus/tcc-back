CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "SubjectClass" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "semeter" TEXT NOT NULL,

    CONSTRAINT "SubjectClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "registration" TEXT NOT NULL,
    "userType" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGivenClasses" (
    "userId" UUID NOT NULL,
    "givenClassId" UUID NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserGivenClasses_pkey" PRIMARY KEY ("userId","givenClassId")
);

-- CreateTable
CREATE TABLE "UsersSubjectClasses" (
    "userId" UUID NOT NULL,
    "subjectClassId" UUID NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersSubjectClasses_pkey" PRIMARY KEY ("userId","subjectClassId")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isTemplate" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "singleAnswer" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "style" JSONB,
    "feedback" TEXT,
    "image" TEXT,
    "order" DOUBLE PRECISION NOT NULL,
    "exhibitionMode" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mandatory" BOOLEAN NOT NULL,
    "formId" UUID NOT NULL,
    "options" JSONB,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_registration_key" ON "User"("registration");

-- AddForeignKey
ALTER TABLE "UserGivenClasses" ADD CONSTRAINT "UserGivenClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGivenClasses" ADD CONSTRAINT "UserGivenClasses_givenClassId_fkey" FOREIGN KEY ("givenClassId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_subjectClassId_fkey" FOREIGN KEY ("subjectClassId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
