import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ObjectValidator } from './questions-json.decorator';

export class CreateManyQuestionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Question id',
    example: '1',
  })
  id?: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question is single answer',
    example: true,
  })
  singleAnswer: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question title',
    example: 'Question 1',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Question subtitle',
    example: 'Question 1 subtitle',
  })
  subtitle?: string;

  @ObjectValidator()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question style',
    example: {
      color: 'red',
      backgroundColor: 'blue',
    },
  })
  style?: any;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question is random',
    example: true,
  })
  random: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Question image',
    example: 'https://example.com/image.png',
  })
  image?: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question order',
    example: 1,
  })
  order: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question type',
    example: 'text',
  })
  type: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question is mandatory',
    example: true,
  })
  mandatory: boolean;

  @ObjectValidator()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question options', // TODO: verificar as opções que serão colocadas aqui
    example: [
      {
        title: 'Option 1',
        order: 1,
      },
      {
        title: 'Option 2',
        order: 2,
      },
    ],
  })
  options?: object;
}
