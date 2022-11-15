import cors from 'cors';
import { expressjwt } from 'express-jwt';
import models from './model';

const origin =
  process.env.CURRENT_ENV === 'local' ? [/localhost/] : [/sami-frontend/];

const validateToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

export default (app) => {
  app.options(
    '*',
    cors({
      origin,
      credentials: true,
    })
  );
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );
  app.use(
    expressjwt({
      secret: process.env.SECRET,
      getToken: validateToken,
      credentialsRequired: false,
      algorithms: ['HS256'],
    })
  );

  app.use((req, res, next) => {
    req.models = models;
    req.user = req?.auth?.user;
    return next();
  });
};
