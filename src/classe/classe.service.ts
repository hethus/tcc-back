import { Injectable } from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';

@Injectable()
export class ClasseService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClasseDto, userLogged: User) {
    const data = {
      name: dto.name,
      semester: dto.semester,
      subjectId: dto.subjectId,
      subjectName: dto.subjectName,
      teacherId: userLogged.id,
    };

    return this.prisma.subjectClass
      .create({
        data,
      })
      .then((classe) => {
        return classe;
      })
      .catch(handleError);
  }

  findAll(email: string) {
    return this.prisma.subjectClass
      .findMany({
        where: {
          teacher: {
            email,
          },
        },
        select: {
          id: true,
          name: true,
          semester: true,
          subjectId: true,
          subjectName: true,
          teacher: true,
          teacherId: true,
          UsersSubjectClasses: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  registration: true,
                },
              },
              assignedAt: true,
              assignedBy: true,
            },
          },
        },
      })
      .then((classes) => classes)
      .catch(handleError);
  }

  findOne(id: string) {
    return this.prisma.subjectClass
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          semester: true,
          subjectId: true,
          subjectName: true,
          teacher: true,
          teacherId: true,
          UsersSubjectClasses: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  registration: true,
                },
              },
              assignedAt: true,
              assignedBy: true,
            },
          },
        },
      })
      .then((classe) => classe)
      .catch(handleError);
  }

  update(id: string, dto: UpdateClasseDto) {
    return this.prisma.subjectClass
      .update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          semester: dto.semester,
          subjectId: dto.subjectId,
          subjectName: dto.subjectName,
        },
      })
      .then((classe) => classe)
      .catch(handleError);
  }

  delete(id: string) {
    return this.prisma.subjectClass
      .delete({
        where: {
          id,
        },
        include: {
          UsersSubjectClasses: true,
        },
      })
      .then((classe) => classe)
      .catch(handleError);
  }
}
