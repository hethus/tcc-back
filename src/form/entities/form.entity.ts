import { Question } from 'src/question/entities/question.entity';

export class Form {
  id?: string;
  name: string;
  description: string;
  random: boolean;
  questions?: Question[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
