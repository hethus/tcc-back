import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';

const validateData = async (data) => {
  if (!data) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return data;
};

const validateCredentials = async (email, password) => {
  if (!email) {
    throw new CustomError(error.BAD_REQUEST.noEmail);
  }

  if (!password) {
    throw new CustomError(error.BAD_REQUEST.noPassword);
  }

  return true;
};

export { validateData, validateCredentials };
