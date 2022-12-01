export class Question {
  id?: string;
  singleAnswer: boolean;
  title: string;
  subtitle?: string;
  style?: JSON;
  random: boolean;
  image?: string;
  order: number;
  type: string;
  mandatory: boolean;
  formId?: string;
  options?: JSON;
  createdAt?: Date;
  updatedAt?: Date;
}
