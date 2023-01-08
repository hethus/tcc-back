import { Indicator } from 'src/indicator/entities/indicator.entity';

export class Group {
  id?: string;
  userId?: string;
  label: string;
  indicators: Indicator[];
  createdAt?: Date;
  updatedAt?: Date;
}
