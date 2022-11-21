import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import tokenLib from 'src/lib/tokenLib';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { validateCredentials, validateData } from 'src/utils/helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  create(dto: CreateUserDto) {
    validateCredentials(dto.email, dto.password)
      .then(() => tokenLib.generatePasswordHash(dto.password))
      .then((passwordHash) => {
        return this.prisma.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            password: passwordHash,
            registration: dto.registration,
            userType: dto.userType,
          },
        });
      })
      .then((data) => validateData(data))
      .then(({ password: userPassword, ...user }) => user)
      .catch(handleError);
  }

  /*   findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  } */

  async update(id: string, dto: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Id é obrigatório');
    }

    try {
      await validateData(dto);
      const data = await this.prisma.user.update({ where: { id }, data: dto });
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
      const data = await this.prisma.user.delete({ where: { id } });
      const { password: userPassword, ...user } = await validateData(data);
      return user;
    } catch (error) {
      return handleError(error);
    }
  }
}
