-- CreateTable
CREATE TABLE "Indicator" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormIndicator" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "formCopy" JSONB[],
    "indicatorId" UUID NOT NULL,
    "repeat" TEXT,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "classId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormIndicator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormIndicator" ADD CONSTRAINT "FormIndicator_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormIndicator" ADD CONSTRAINT "FormIndicator_classId_fkey" FOREIGN KEY ("classId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
