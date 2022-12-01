import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateQuestionDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question singleAnswer',
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

  @IsJSON()
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
    description: 'Question random',
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
    description: 'Question mandatory',
    example: true,
  })
  mandatory: boolean;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question formId',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  formId: string;

  @IsJSON()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question options',
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
