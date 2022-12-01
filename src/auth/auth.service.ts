import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto, LogoutResponseDto } from './dto/response';
import * as bcrypt from 'bcrypt';
import { cryptUrl, validateData } from 'src/utils/helper';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { User } from 'src/user/entities/user.entity';
import crypto from 'crypto-js';

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

    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    if (user.newUser) {
      const token = this.jwtService.sign(
        {
          id: user.id,
          email,
          name: user.name,
          registration: user.registration,
        },
        {
          expiresIn: '30m',
        },
      );

      const tokenCrypt = crypto.AES.encrypt(
        token,
        process.env.JWT_NEW_USER_SECRET,
      ).toString();

      const tokenUrl = await cryptUrl(tokenCrypt);

      await this.prisma.user.update({
        where: { email: user.email },
        data: { tokenChange: tokenCrypt },
      });

      return {
        login: false,
        message: 'Usuário novo, por favor crie uma senha',
        tokenUrl,
      };
    }

    const token = this.jwtService.sign({ id: user.id, email, name: user.name });

    await this.prisma.user.update({
      where: { email: user.email },
      data: { token, tokenChange: null },
    });

    return {
      login: true,
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
