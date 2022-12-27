import { Prisma, PrismaClient } from '@prisma/client';

export const classes: Prisma.SubjectClassCreateInput[] = [
  {
    id: 'fa679963-9bdd-4292-af6e-612e16c16b7a',
    name: 'Turma C',
    semester: '01-2023',
    subjectName: 'Calculo I',
    subjectId: 123,
    teacher: {
      connect: {
        registration: '123456789',
      },
    },
  },
  {
    id: '4494c7f9-ffa0-45ac-b02f-d7a1984cc982',
    name: 'Turma D',
    semester: '01-2023',
    subjectName: 'Logica de programação I',
    subjectId: 234,
    teacher: {
      connect: {
        registration: '123456789',
      },
    },
  },
  {
    id: '48af8d53-1959-4124-b198-17b260bc389d',
    name: 'Turma B',
    semester: '02-2023',
    subjectName: 'Algoritmos',
    subjectId: 345,
    teacher: {
      connect: {
        registration: '123456789',
      },
    },
  },
  {
    id: '65f4d55c-95c3-44a8-8d76-b0ec135c40d8',
    name: 'Turma A',
    semester: '03-2023',
    subjectName: 'Logica de programação II',
    subjectId: 456,
    teacher: {
      connect: {
        registration: '123456789',
      },
    },
  },
];

export const classe = async (prisma: PrismaClient) => {
  for (const obj of Object.values(classes)) {
    await prisma.subjectClass.upsert({
      where: {
        id: obj.id,
      },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
