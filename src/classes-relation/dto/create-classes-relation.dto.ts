import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassesRelationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id do professor',
    example: '',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id da sala criada',
    example: '',
  })
  subjectClassId: string;
}
