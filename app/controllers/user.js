import tokenLib from '../../lib/tokenLib';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import { validateData, validateCredentials } from '../services/helper';

const createUser = (req, res, next) => {
  const { body, where, models } = req;
  const { email, password } = body;
  const { User } = models;

  return validateCredentials(email, password)
    .then(() => tokenLib.generatePasswordHash(password))
    .then((passwordHash) =>
      User.create({
        data: {
          ...body,
          ...where,
          password: passwordHash,
        },
      })
    )
    .then(validateData)
    .then(({ password: userPassword, ...user }) =>
      res.status(200).json({ user })
    )
    .catch(next);
};

const updateUser = (req, res, next) => {
  const {
    body,
    where,
    params: { id },
    models,
  } = req;
  const { User } = models;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noUser);
  }

  return validateData(body)
    .then(() => User.update({ where: { id, ...where }, data: body }))
    .then(validateData)
    .then(({ password: userPassword, ...user }) =>
      res.status(200).json({ user })
    )
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const {
    where,
    params: { id },
    models,
  } = req;
  const { User } = models;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noUser);
  }

  return User.delete({ where: { id, ...where } })
    .then(validateData)
    .then(({ password, ...user }) => res.status(200).json({ user }))
    .catch(next);
};

export { createUser, updateUser, deleteUser };
