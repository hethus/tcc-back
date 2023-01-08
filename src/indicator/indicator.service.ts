import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { isAllowedOrIsMe } from 'src/lib/authLib';
import { RelationIndicatorDto } from './dto/relation-indicator.dto';
import enums from '../lib/enumLib';

const { userType } = enums;

@Injectable()
export class IndicatorService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateIndicatorDto, user: User) {
    const data = {
      name: dto.name,
      description: dto.description,
      groupId: dto.groupId,
      methodologyId: dto.methodologyId,
      userId: user.id,
    };

    return this.prisma.indicator
      .create({
        data,
      })
      .then(async (indicator) => {
        if (!dto.formsId || dto.formsId.length === 0) {
          return indicator;
        }

        dto.formsId.forEach(async (formId) => {
          const form = await this.prisma.form.findUnique({
            where: {
              id: formId,
            },
            select: {
              name: true,
              description: true,
              random: true,
            },
          });

          if (!form) {
            throw new NotFoundException('Indicador não encontrado');
          }

          const newForm = await this.prisma.form.create({
            data: {
              ...form,
              userId: user.id,
              indicatorId: indicator.id,
            },
          });

          const questions = await this.prisma.question.findMany({
            where: {
              formId,
            },
            select: {
              singleAnswer: true,
              title: true,
              subtitle: true,
              style: true,
              random: true,
              image: true,
              order: true,
              type: true,
              mandatory: true,
              options: true,
            },
          });

          if (!questions || questions.length === 0) {
            return;
          }

          return await this.prisma.question.createMany({
            data: questions.map((question) => ({
              ...question,
              formId: newForm.id,
            })),
          });
        });

        return await this.prisma.indicator.findUnique({
          where: {
            id: indicator.id,
          },
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            groupId: true,
            methodologyId: true,
            userId: true,
            forms: true,
          },
        });
      })
      .catch(handleError);
  }

  async addForm(id: string, dto: RelationIndicatorDto, user: User) {
    const indicator = await this.prisma.indicator.findUnique({
      where: {
        id,
      },
    });

    if (!indicator) {
      throw new NotFoundException('Indicador não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, indicator.userId);

    dto.formsId.forEach(async (formId) => {
      const form = await this.prisma.form.findUnique({
        where: {
          id: formId,
        },
        select: {
          name: true,
          description: true,
          random: true,
        },
      });

      if (!form) {
        throw new NotFoundException('Indicador não encontrado');
      }

      const newForm = await this.prisma.form.create({
        data: {
          ...form,
          userId: user.id,
          indicatorId: indicator.id,
        },
      });

      const questions = await this.prisma.question.findMany({
        where: {
          formId,
        },
        select: {
          singleAnswer: true,
          title: true,
          subtitle: true,
          style: true,
          random: true,
          image: true,
          order: true,
          type: true,
          mandatory: true,
          options: true,
        },
      });

      if (!questions || questions.length === 0) {
        return;
      }

      return await this.prisma.question.createMany({
        data: questions.map((question) => ({
          ...question,
          formId: newForm.id,
        })),
      });
    });

    return await this.prisma.indicator.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        groupId: true,
        methodologyId: true,
        userId: true,
        forms: true,
      },
    });
  }

  async removeForm(id: string, dto: RelationIndicatorDto, user: User) {
    const indicator = await this.prisma.indicator.findUnique({
      where: {
        id,
      },
    });

    if (!indicator) {
      throw new NotFoundException('Indicador não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, indicator.userId);

    return await this.prisma.form
      .deleteMany({
        where: {
          id: {
            in: dto.formsId,
          },
        },
      })
      .catch(handleError);
  }

  async findAll(email: string) {
    const indicators = await this.prisma.indicator.findMany({
      where: {
        user: {
          email,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        groupId: true,
        methodologyId: true,
        userId: true,
        forms: true,
      },
    });

    const indicatorsOrdered = indicators.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });

    return indicatorsOrdered;
  }

  async findOne(id: string, user: User) {
    const indicator = await this.prisma.indicator
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          groupId: true,
          methodologyId: true,
          userId: true,
          forms: {
            select: {
              id: true,
              name: true,
              evaluation: {
                select: {
                  id: true,
                  createdAt: true,
                  response: true,
                  initialDate: true,
                  finalDate: true,
                  class: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    if (!indicator) {
      throw new NotFoundException('Indicador não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, indicator.userId);

    return indicator;
  }

  async update(id: string, dto: UpdateIndicatorDto, user: User) {
    const indicator = await this.prisma.indicator.findUnique({
      where: {
        id,
      },
    });

    if (!indicator) {
      throw new NotFoundException('Indicador não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, indicator.userId);

    const data = {
      name: dto.name,
      description: dto.description,
      groupId: dto.groupId,
      methodologyId: dto.methodologyId,
    };

    return this.prisma.indicator
      .update({
        where: {
          id,
        },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    const indicator = await this.prisma.indicator.findUnique({
      where: {
        id,
      },
    });

    if (!indicator) {
      throw new NotFoundException('Indicador não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, indicator.userId);

    return this.prisma.indicator
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
