import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from '../app/errorHandlers/customErrorList';

const jwtSecret = process.env.SECRET;

const verifyPassword = (password, hash) => bcrypt.compare(password, hash);
const generateRandomToken = async () => crypto.randomBytes(20).toString('hex');

const generatePasswordHash = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const generateToken = (object) => {
  return jwt.sign(
    {
      id: object.id,
      name: object.name,
      email: object.email,
    },
    jwtSecret,
    {
      expiresIn: 60 * 60 * 24 * 30, // 2 hours
    }
  );
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) return reject(error.UNAUTHORIZED.invalidToken);
      return resolve(payload);
    });
  });
};

export default {
  verifyToken,
  verifyPassword,
  generateRandomToken,
  generatePasswordHash,
  generateToken,
};
