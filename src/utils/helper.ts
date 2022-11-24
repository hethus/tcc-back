import { BadRequestException } from '@nestjs/common';

const validateData = async (data) => {
  if (!data) {
    throw new BadRequestException('Dados não foram informados.');
  }

  return data;
};

const validateCredentials = async (email, password) => {
  if (!email) {
    throw new BadRequestException('E-mail não foi informado.');
  }

  if (!password) {
    throw new BadRequestException('Senha não foi informada.');
  }

  return true;
};

const cryptUrl = async (string: string) => {
  return string
    .replace(/\+/g, 'p1L2u3S')
    .replace(/\//g, 's1L2a3S4h')
    .replace(/=/g, 'e1Q2u3A4l');
};

const decryptUrl = async (string: string) => {
  return string
    .replace(/p1L2u3S/g, '+')
    .replace(/s1L2a3S4h/g, '/')
    .replace(/e1Q2u3A4l/g, '=');
};

export { validateData, validateCredentials, cryptUrl, decryptUrl };
