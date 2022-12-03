import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { isAllowedOrIsMe } from 'src/lib/authLib';
import { User } from 'src/user/entities/user.entity';
import enums from '../lib/enumLib';
import { handleError } from 'src/utils/errorHandlers/customErrorList';

const { userType } = enums;

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFormDto, user: User) {
    const data = {
      name: dto.name,
      description: dto.description,
      userId: user.id,
      random: dto.random,
    };

    return await this.prisma.form
      .create({
        data,
      })
      .then(async (form) => {
        if (!dto.questions || dto.questions.length === 0) {
          return form;
        }

        await this.prisma.question.createMany({
          data: dto.questions.map((question) => {
            return {
              ...question,
              formId: form.id,
            };
          }),
        });

        return await this.prisma.form
          .findUnique({
            where: {
              id: form.id,
            },
            select: {
              id: true,
              name: true,
              description: true,
              random: true,
              createdAt: true,
              updatedAt: true,
              questions: true,
              userId: true,
            },
          })
          .catch(handleError);
      })
      .catch(handleError);
  }

  async findAll(email: string) {
    return await this.prisma.form
      .findMany({
        where: {
          user: {
            email,
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          random: true,
          createdAt: true,
          updatedAt: true,
          questions: true,
          userId: true,
        },
      })
      .catch(handleError);
  }

  async findOne(id: string, user: User) {
    const form = await this.prisma.form
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          random: true,
          createdAt: true,
          updatedAt: true,
          questions: true,
          userId: true,
        },
      })
      .catch(handleError);

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    return form;
  }

  async update(id: string, dto: UpdateFormDto, user: User) {
    const form = await this.prisma.form
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    const data = {
      name: dto.name,
      description: dto.description,
      random: dto.random,
    };

    return await this.prisma.form
      .update({
        where: {
          id,
        },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    const form = await this.prisma.form
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    return await this.prisma.form
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
