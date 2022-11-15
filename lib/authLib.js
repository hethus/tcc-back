import { error } from '../app/errorHandlers/customErrorList';
import enums from './enumLib';

const { userType } = enums;

const isAllowed = (allowAudience) => (req, res, next) => {
  const { user } = req;

  const _allowAudience = Array.isArray(allowAudience)
    ? allowAudience
    : [allowAudience];

  if (!user) {
    return next({ ...error.UNAUTHORIZED.notAuthorized, logout: true });
  }

  if (!_allowAudience.includes(user.userType)) {
    return next(error.UNAUTHORIZED.notAuthorized);
  }

  return next();
};

const isAllowedOrIsMe = (allowAudience) => (req, res, next) => {
  const { user, params } = req;

  const { id } = params || {};

  if (id && id === user?.id) {
    req.where = { userType: user?.userType, id: user?.id };
    return next();
  }

  const _allowAudience = Array.isArray(allowAudience)
    ? allowAudience
    : [allowAudience];

  if (!user) {
    return next({ ...error.UNAUTHORIZED.notAuthorized, logout: true });
  }

  if (!_allowAudience.includes(user.userType)) {
    return next(error.UNAUTHORIZED.notAuthorized);
  }

  return next();
};

const checkUserHierarchy = (req, res, next) => {
  const { user, params } = req;

  const { type, id } = params || {};

  if (id && id === user?.id) {
    req.where = { userType: user?.userType, id: user?.id };
    return next();
  }

  if (!type || !userType[user?.userType].canModify.includes(type)) {
    return next({ ...error.UNAUTHORIZED.notAuthorized, logout: true });
  }

  req.where = { userType: user?.userType, id: user?.id };
  return next();
};

export { isAllowed, isAllowedOrIsMe, checkUserHierarchy };
