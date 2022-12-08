import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ObjectValidator } from './questions-json.decorator';

export class CreateQuestionDto {
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
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question subtitle',
    example: 'Question 1 subtitle',
  })
  subtitle?: string;

  @ObjectValidator()
  @IsOptional()
  @ApiProperty({
    description: 'Question style',
    example: {
      color: 'red',
      backgroundColor: 'blue',
    },
  })
  style?: object;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question is random',
    example: true,
  })
  random: boolean;

  @IsString()
  @IsNotEmpty()
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

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'form id to connect',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  formId: string;

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
  options?: any;
}
