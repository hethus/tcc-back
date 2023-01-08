import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMethodologyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Methodology name',
    example: 'Methodology 1',
  })
  label: string;
}
