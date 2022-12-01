import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

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
}
