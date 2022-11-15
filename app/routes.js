import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import basicRoutes from './routes/basicRoutes';
import publicRoutes from './routes/public';
import { checkUserHierarchy } from '../lib/authLib';

export default (app) => {
  app.use(`/auth`, authRoutes);
  app.use(`/public`, publicRoutes);
  app.use(`/user`, checkUserHierarchy, userRoutes);
  app.use(`/:parseModel`, basicRoutes);
};
