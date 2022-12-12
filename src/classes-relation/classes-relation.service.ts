import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateClassesRelationDto } from './dto/create-classes-relation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';

@Injectable()
export class ClassesRelationService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClassesRelationDto, userLogged: User) {
    const userVerify = this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!userVerify) {
      throw new BadRequestException('Usuário não encontrado!');
    }

    const classVerify = this.prisma.subjectClass.findUnique({
      where: {
        id: dto.subjectClassId,
      },
    });

    if (!classVerify) {
      throw new BadRequestException('Classe não encontrada!');
    }

    return this.prisma.usersSubjectClasses
      .create({
        data: {
          assignedBy: userLogged.name,
          user: {
            connect: {
              id: dto.userId,
            },
          },
          subjectClass: {
            connect: {
              id: dto.subjectClassId,
            },
          },
        },
      })
      .then((relation) => {
        console.log(relation);
        return relation;
      })
      .catch(handleError);
  }

  findOne(id: string) {
    return this.prisma.usersSubjectClasses
      .findUnique({
        where: {
          userId_subjectClassId: {
            userId: id,
            subjectClassId: id,
          },
        },
      })
      .then((relation) => relation)
      .catch(handleError);
  }

  delete(id: string) {
    return this.prisma.usersSubjectClasses
      .delete({
        where: {
          userId_subjectClassId: {
            userId: id,
            subjectClassId: id,
          },
        },
      })
      .then((relation) => relation)
      .catch(handleError);
  }
}
