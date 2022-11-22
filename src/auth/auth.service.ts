import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto, LogoutResponseDto } from './dto/response';
import * as bcrypt from 'bcrypt';
import { validateData } from 'src/utils/helper';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    /*     if (!user.isVerified) {
      throw new UnauthorizedException('User not verified');
    }

    if (user.isDeleted === true) {
      throw new UnauthorizedException('User deleted');
    } */

    const isHashValid = await bcrypt.compare(password, user.password);
    if (!isHashValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    if (user.newUser) {
      throw new UnauthorizedException('Usuário novo, por favor crie uma senha');
    }

    const token = this.jwtService.sign({ id: user.id, email, name: user.name });

    await this.prisma.user.update({
      where: { email: user.email },
      data: { token },
    });

    /*     await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken: null },
    }); */

    return {
      token,
    };
  }

  async logout(user: User): Promise<LogoutResponseDto> {
    try {
      await validateData(user.email);
      const userVerify = await this.prisma.user.findUnique({
        where: {
          email: user.email.toLowerCase(),
        },
      });
      await this.prisma.user.update({
        where: { email: userVerify.email },
        data: { token: null },
      });
      return {
        logout: true,
      };
    } catch (error) {
      return handleError(error);
    }
  }
}
