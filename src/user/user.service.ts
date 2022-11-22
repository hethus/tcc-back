import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import tokenLib from 'src/lib/tokenLib';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { validateData } from 'src/utils/helper';
import { CreatePasswordDto } from './dto/create-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { registration: dto.registration }] },
    });

    if (user) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    return this.prisma.user
      .create({
        data: {
          name: dto.name,
          email: dto.email,
          password: await tokenLib.generatePasswordHash(dto.registration),
          registration: dto.registration,
          userType: dto.userType,
        },
      })
      .then(({ password, ...user }) => user)
      .catch(handleError);
  }

  /*   findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  } */

  async firstAccess(email: string, dto: CreatePasswordDto) {
    try {
      if (!email) {
        throw new BadRequestException('email é obrigatório');
      }

      const verifyUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!verifyUser) {
        throw new BadRequestException('Usuário não encontrado');
      }

      if (!verifyUser.newUser) {
        throw new BadRequestException('Usuário já cadastrou senha');
      }

      const verifyPassword = await bcrypt.compare(
        dto.password,
        verifyUser.password,
      );
      if (!verifyPassword) {
        throw new BadRequestException('Senha incorreta');
      }

      const data = {
        password: await tokenLib.generatePasswordHash(dto.newPassword),
        newUser: false,
      };

      const userUpdate = await this.prisma.user.update({
        where: { email: email },
        data,
      });

      const { password: userPassword, ...user } = await validateData(
        userUpdate,
      );

      return user;
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Id é obrigatório');
    }

    try {
      await validateData(dto);
      const data = await this.prisma.user.update({
        where: { id },
        data: dto,
      });
      const { password: userPassword, ...user } = await validateData(data);
      return user;
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: string, user: User) {
    if (!id) {
      throw new BadRequestException('Id é obrigatório');
    }

    if (user.userType !== 'admin' && user.userType !== 'teacher') {
      throw new BadRequestException('Usuário sem permissão');
    }

    try {
      const data = await this.prisma.user.delete({
        where: { id },
      });
      await validateData(data);
      const { password: userPassword, ...user } = await validateData(data);
      return user;
    } catch (error) {
      return handleError(error);
    }
  }
}
