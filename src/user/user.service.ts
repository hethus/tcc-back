import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import tokenLib from 'src/lib/tokenLib';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { cryptUrl, decryptUrl, validateData } from 'src/utils/helper';
import { CreatePasswordDto } from './dto/create-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import crypto from 'crypto-js';
import { JwtPayload } from './entities/jwtChangePassword.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto, userLogged: User) {
    const verifyUser = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { registration: dto.registration }] },
    });

    if (verifyUser) {
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
      .then(async ({ password, ...createUser }) => {
        const token = this.jwtService.sign(
          {
            id: createUser.id,
            email: createUser.email,
            name: createUser.name,
            registration: createUser.registration,
          },
          {
            expiresIn: '2h',
          },
        );

        const tokenCrypt = crypto.AES.encrypt(
          token,
          process.env.JWT_NEW_USER_SECRET,
        ).toString();

        const tokenUrl = await cryptUrl(tokenCrypt);

        await this.prisma.user.update({
          where: { email: createUser.email },
          data: { tokenChange: tokenCrypt },
        });

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          service: 'gmail',
          secure: true,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
        });

        const mailData = {
          from: `TCC <${process.env.USER_EMAIL}>`,
          to: createUser.email,
          subject: 'Cadastro de usuário',
          text: `Olá ${createUser.name}, seu cadastro foi realizado com sucesso pelo usuário ${userLogged.name}. Sua senha é ${createUser.registration}
                  aproveite e valide a sua senha aqui: {AREA EM DESENVOLVIMENTO} localhost/user/first-access/${tokenUrl}.`, // aqui vai a url do front que aponta para a rota firstAccess, se o user n respeitar isso e tentar fazer login, o front vai redirecionar para a mesma pagina de cadastro de senha
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException('Error sending email');
          } else {
            console.log(info);
          }
        });

        return createUser;
      })
      .catch(handleError);
  }

  /*   findAll() {
    return `This action returns all user`;
  }
  */

  async findLogged(user: User) {
    const userLogged = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userLogged) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password: userPassword, ...userData } = await validateData(
      userLogged,
    );

    return userData;
  }

  async firstAccess(tokenCrypt: string, dto: CreatePasswordDto) {
    try {
      if (!tokenCrypt) {
        throw new BadRequestException('token é obrigatório');
      }

      const tokenDecryptUrl = await decryptUrl(tokenCrypt);

      const tokenDecrypt = crypto.AES.decrypt(
        tokenDecryptUrl,
        process.env.JWT_NEW_USER_SECRET,
      ).toString(crypto.enc.Utf8);

      let jwtVerify: JwtPayload;
      try {
        jwtVerify = this.jwtService.verify(tokenDecrypt);
      } catch (error) {
        throw new UnauthorizedException('Token inválido');
      }

      const verifyUser = await this.prisma.user.findUnique({
        where: { email: jwtVerify.email },
      });

      if (!verifyUser) {
        throw new BadRequestException('Usuário não encontrado');
      }

      if (
        !verifyUser.tokenChange ||
        verifyUser.tokenChange !== tokenDecryptUrl
      ) {
        throw new UnauthorizedException('Token inválido');
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
        tokenChange: null,
      };

      const userUpdate = await this.prisma.user.update({
        where: { email: verifyUser.email },
        data,
      });

      const { password: userPassword, ...user } = await validateData(
        userUpdate,
      );

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailData = {
        from: `TCC <${process.env.USER_EMAIL}>`,
        to: user.email,
        subject: 'Alteração de senha - primeiro acesso',
        text: `Olá ${user.name}. Sua senha já foi alterada, agora já pode fazer login na aplicação!`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);

          throw new BadRequestException('Error sending email');
        } else {
          console.log(info);
        }
      });

      return user;
    } catch (error) {
      return handleError(error);
    }
  }

  async sendEmailForgotPassword(email: string): Promise<string> {
    const user = await this.prisma.user
      .findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          registration: true,
          newUser: true,
        },
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`Email '${email}' não encontrado`);
    }

    if (user.newUser) {
      throw new NotFoundException(`Usuário '${email}' não cadastrou senha`);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      registration: user.registration,
    };

    const token = this.jwtService.sign(payload);

    const tokenCrypt = crypto.AES.encrypt(
      token,
      process.env.JWT_CHANGE_PASSWORD_SECRET,
    ).toString();

    const tokenToUrl = await cryptUrl(tokenCrypt);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailData = {
      from: `TCC <${process.env.USER_EMAIL}>`,
      to: user.email,
      subject: 'Alteração de senha',
      text: `altere a senha aqui: {AREA EM DESENVOLVIMENTO} localhost/user/change-password/${tokenToUrl}`,
    };

    transporter.sendMail(mailData, async function (err, info) {
      if (err) {
        console.log(err);

        throw new BadRequestException('Error sending email');
      } else {
        console.log(info);
      }
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { tokenChange: tokenCrypt },
    });

    return 'Email enviado com sucesso';
  }

  async changePassword(
    tokenCrypt: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    if (!tokenCrypt) {
      throw new BadRequestException('token é obrigatório');
    }

    const tokenDecryptUrl = await decryptUrl(tokenCrypt);

    const tokenDecrypt = crypto.AES.decrypt(
      tokenDecryptUrl,
      process.env.JWT_CHANGE_PASSWORD_SECRET,
    ).toString(crypto.enc.Utf8);

    let jwtVerify: JwtPayload;
    try {
      jwtVerify = this.jwtService.verify(tokenDecrypt);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    const verifyUser = await this.prisma.user.findUnique({
      where: { email: jwtVerify.email },
    });

    if (!verifyUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (!verifyUser.tokenChange || verifyUser.tokenChange !== tokenDecryptUrl) {
      throw new UnauthorizedException('Token inválido');
    }

    if (verifyUser.newUser) {
      throw new BadRequestException('Usuário não cadastrou senha');
    }

    if (!dto.password || !dto.confirmPassword) {
      throw new BadRequestException('Informe a nova senha.');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    const hashedPassword = await tokenLib.generatePasswordHash(dto.password);

    const data: Prisma.UserUpdateInput = {
      password: hashedPassword,
      tokenChange: null,
    };

    return this.prisma.user
      .update({
        where: { email: verifyUser.email },
        data,
      })
      .then((user) => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          service: 'gmail',
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
        });

        const mailData = {
          from: `TCC <${process.env.USER_EMAIL}>`,
          to: user.email,
          subject: 'Senha alterada',
          text: `Olá ${user.name}. Sua senha já foi alterada, agora já pode fazer login na aplicação!`,
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException('Error sending email');
          } else {
            console.log(info);
          }
        });
        return { message: 'Senha alterada com sucesso' };
      })
      .catch(handleError);
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
