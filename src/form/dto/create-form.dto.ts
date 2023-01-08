import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateManyQuestionDto } from 'src/question/dto/create-many-question.dto';
import { Type } from 'class-transformer';
import { ArrayValidator } from 'src/utils/array-validator.decorator';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Form name',
    example: 'Form 1',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Form description',
    example: 'Form 1 description',
  })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Form random',
    example: true,
  })
  random: boolean;

  @IsOptional()
  @ArrayValidator()
  @ValidateNested({ each: true })
  @Type(() => CreateManyQuestionDto)
  @ApiProperty({
    description: 'Form questions',
    example: [
      {
        singleAnswer: true,
        title: 'Question 1',
        subtitle: 'Question 1 subtitle',
        style: {
          color: 'red',
          backgroundColor: 'blue',
        },
        random: true,
        image: 'https://example.com/image.png',
        order: 1,
        type: 'text',
        mandatory: true,
        options: [
          {
            title: 'Option 1',
            order: 1,
          },
          {
            title: 'Option 2',
            order: 2,
          },
        ],
      },
    ],
  })
  questions: CreateQuestionDto[];
}
