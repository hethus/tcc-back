import { Indicator } from 'src/indicator/entities/indicator.entity';

export class methodology {
  id?: string;
  userId?: string;
  label: string;
  indicators: Indicator[];
  createdAt?: Date;
  updatedAt?: Date;
}
