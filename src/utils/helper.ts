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

export { validateData, validateCredentials };
