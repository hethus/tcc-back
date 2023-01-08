import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import enums from '../lib/enumLib';
import { isAllowedOrIsMe } from 'src/lib/authLib';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { CreateMethodologyDto } from './dto/create-methodology.dto';
import { UpdateMethodologyDto } from './dto/update-methodology.dto';

const { userType } = enums;

@Injectable()
export class MethodologyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateMethodologyDto, user: User) {
    return this.prisma.methodology
      .create({
        data: {
          label: dto.label,
          userId: user.id,
        },
      })
      .catch(handleError);
  }

  async findAll(email: string) {
    return this.prisma.methodology
      .findMany({
        where: {
          user: {
            email,
          },
        },
      })
      .catch(handleError);
  }

  async findOne(id: string, user: User) {
    const methodology = await this.prisma.methodology
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!methodology) {
      throw new NotFoundException('Metodologia não encontrada');
    }

    isAllowedOrIsMe(userType.admin.value, user, methodology.userId);

    return methodology;
  }

  async update(id: string, dto: UpdateMethodologyDto, user: User) {
    const methodology = await this.prisma.methodology
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!methodology) {
      throw new NotFoundException('Metodologia não encontrada');
    }

    isAllowedOrIsMe(userType.admin.value, user, methodology.userId);

    return this.prisma.methodology
      .update({
        where: {
          id,
        },
        data: {
          label: dto.label,
        },
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    const methodology = await this.prisma.methodology
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!methodology) {
      throw new NotFoundException('Metodologia não encontrada');
    }

    isAllowedOrIsMe(userType.admin.value, user, methodology.userId);

    return this.prisma.methodology
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
