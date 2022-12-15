import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Teste-admin',
    email: 'admin@gmail.com',
    registration: '1234567891',
    userType: 'admin',
    password: 'teste',
  },
  {
    name: 'Teste-teacher',
    email: 'teacher@gmail.com',
    registration: '123456789',
    userType: 'teacher',
    password: 'teste',
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};
