import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassesRelationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '',
    example: '',
  })
  assignedBy: string;
}
