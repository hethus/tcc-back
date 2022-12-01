/* eslint-disable prettier/prettier */
import locale from './en.json';
import { UnprocessableEntityException } from '@nestjs/common';

/* interface ICustomErrorList {
  NOT_FOUND: {
    userNotFound: IErrorObject;
    pageNotFound: IErrorObject;
  };
  BAD_REQUEST: {
    invalidCredentials: IErrorObject;
    noData: IErrorObject;
    noUser: IErrorObject;
    noEmail: IErrorObject;
    noPassword: IErrorObject;
  };
  UNAUTHORIZED: {
    notAuthorized: IErrorObject;
    tokenExpired: IErrorObject;
    invalidToken: IErrorObject;
  };
}

interface IErrorObject {
  statusCode: number;
  code: string;
  message: string;
}

const error = {} as ICustomErrorList;

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

error.NOT_FOUND = {
  userNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00001',
    message: locale.userNotFound,
  },
  pageNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00002',
    message: locale.pageNotFound,
  },
};

error.BAD_REQUEST = {
  invalidCredentials: {
    statusCode: BAD_REQUEST,
    code: 'BR-00001',
    message: locale.invalidCredentials,
  },
  noData: {
    statusCode: BAD_REQUEST,
    code: 'BR-00002',
    message: locale.noData,
  },
  noUser: {
    statusCode: BAD_REQUEST,
    code: 'BR-00003',
    message: locale.noUser,
  },
  noEmail: {
    statusCode: BAD_REQUEST,
    code: 'BR-00004',
    message: locale.noEmail,
  },
  noPassword: {
    statusCode: BAD_REQUEST,
    code: 'BR-00005',
    message: locale.noPassword,
  },
};

error.UNAUTHORIZED = {
  notAuthorized: {
    statusCode: UNAUTHORIZED,
    code: 'UA-00001',
    message: locale.notAuthorized,
  },
  tokenExpired: {
    statusCode: UNAUTHORIZED,
    code: 'UA-00002',
    message: locale.tokenExpired,
  },
  invalidToken: {
    statusCode: UNAUTHORIZED,
    code: 'REF-00003',
    message: locale.invalidToken,
  },
};


export { error, NOT_FOUND, UNAUTHORIZED }; */

export function handleError(error: Error): never {
  const errorLines = error.message?.split('\n');
  const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

  if (!lastErrorLine) {
    console.error(error);
  }

  throw new UnprocessableEntityException(
    lastErrorLine || 'Algum erro ocorreu ao executar a operação',
  );
}
