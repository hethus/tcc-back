import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import enums from '../lib/enumLib';
import { isAllowedOrIsMe } from 'src/lib/authLib';

const { userType } = enums;

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateGroupDto, user: User) {
    return this.prisma.group
      .create({
        data: {
          label: dto.label,
          userId: user.id,
        },
      })
      .catch(handleError);
  }

  async findAll(email: string) {
    return this.prisma.group
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
    const group = await this.prisma.group
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!group) {
      throw new NotFoundException('Grupo não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, group.userId);

    return group;
  }

  async update(id: string, dto: UpdateGroupDto, user: User) {
    const group = await this.prisma.group
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!group) {
      throw new NotFoundException('Grupo não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, group.userId);

    return this.prisma.group
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
    const group = await this.prisma.group
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!group) {
      throw new NotFoundException('Grupo não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, group.userId);

    return this.prisma.group
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
