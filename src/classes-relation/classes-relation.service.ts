import { Injectable } from '@nestjs/common';
import { CreateClassesRelationDto } from './dto/create-classes-relation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';

@Injectable()
export class ClassesRelationService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClassesRelationDto, userLogged: User) {
    return this.prisma.usersSubjectClasses
      .create({
        data: {
          assignedBy: dto.assignedBy,
          userId: userLogged.name,
          subjectClassId: userLogged.id,
        },
      })
      .then((relation) => relation)
      .catch(handleError);
  }

  findAll() {
    return `This action returns all classesRelation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classesRelation`;
  }

  delete(id: number) {
    return `This action removes a #${id} classesRelation`;
  }
}
