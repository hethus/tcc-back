import { Injectable } from '@nestjs/common';
import { isAllowedOrIsMe } from 'src/lib/authLib';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import enums from '../lib/enumLib';

const { userType } = enums;

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuestionDto) {
    return await this.prisma.question
      .create({
        data: {
          singleAnswer: dto.singleAnswer,
          title: dto.title,
          style: dto.style,
          random: dto.random,
          image: dto.image,
          order: dto.order,
          type: dto.type,
          mandatory: dto.mandatory,
          form: {
            connect: {
              id: dto.formId,
            },
          },
          options: dto.options,
        },
      })
      .catch(handleError);
  }

  async findOne(id: string, user: User) {
    const question = await this.prisma.question
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    const form = await this.prisma.form.findUnique({
      where: {
        id: question.formId,
      },
      select: {
        userId: true,
      },
    });

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    return question;
  }

  async update(id: string, dto: UpdateQuestionDto, user: User) {
    const question = await this.prisma.question
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    const form = await this.prisma.form.findUnique({
      where: {
        id: question.formId,
      },
      select: {
        userId: true,
      },
    });

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    return await this.prisma.question
      .update({
        where: {
          id,
        },
        data: {
          singleAnswer: dto.singleAnswer,
          title: dto.title,
          style: dto.style,
          random: dto.random,
          image: dto.image,
          order: dto.order,
          type: dto.type,
          mandatory: dto.mandatory,
          options: dto.options,
        },
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    const question = await this.prisma.question
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    const form = await this.prisma.form.findUnique({
      where: {
        id: question.formId,
      },
      select: {
        userId: true,
      },
    });

    isAllowedOrIsMe(userType.admin.value, user, form.userId);
    this.prisma.usersSubjectClasses.deleteMany({
      where: {
        subjectClassId: id,
        userId: user.id,
      },
    });

    return await this.prisma.question
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
