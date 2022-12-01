import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import enums from './enumLib';

const { userType } = enums;

const isAllowed = (allowAudience: string[], user: User) => {
  const _allowAudience = Array.isArray(allowAudience)
    ? allowAudience
    : [allowAudience];

  if (!user) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }

  if (!_allowAudience.includes(user.userType)) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }
};

const isAllowedOrIsMe = (allowAudience: string, user: User, id: string) => {
  if (id && id === user?.id) {
    return;
  }

  const _allowAudience = Array.isArray(allowAudience)
    ? allowAudience
    : [allowAudience];

  if (!user) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }

  if (!_allowAudience.includes(user.userType)) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }
};

const isAllowedOrIsMeEmail = (
  allowAudience: string,
  user: User,
  email: string,
) => {
  if (email && email === user?.email) {
    return;
  }

  const _allowAudience = Array.isArray(allowAudience)
    ? allowAudience
    : [allowAudience];

  if (!user) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }

  if (!_allowAudience.includes(user.userType)) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }
};

const checkUserHierarchy = (req, res, next) => {
  const { user, params } = req;

  const { type, id } = params || {}; // o que é esse type?

  if (id && id === user?.id) {
    req.where = { userType: user?.userType, id: user?.id };
    return next();
  }

  if (!type || !userType[user?.userType].canModify.includes(type)) {
    throw new UnauthorizedException('Usuário não autorizado.');
  }

  req.where = { userType: user?.userType, id: user?.id };
  return next();
};

export { isAllowed, isAllowedOrIsMe, checkUserHierarchy, isAllowedOrIsMeEmail };
