import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateIndicatorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicator name',
    example: 'Indicator 1',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicator description',
    example: 'Indicator description',
  })
  description: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicator methodology id',
    example: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
  })
  methodologyId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicator group id',
    example: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
  })
  groupId: string;

  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ApiProperty({
    description: 'Indicator forms id',
    example: [
      'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
      'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
    ],
  })
  formsId: string[];
}
