/* eslint-disable prettier/prettier */
export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  registration?: string;
  userType?: 'admin' | 'teacher' | 'student';
  token?: string;
  tokenChange?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
