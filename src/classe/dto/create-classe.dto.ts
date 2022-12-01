import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClasseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Classe name',
    example: 'Turma 1',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Discipline name',
    example: 'Math',
  })
  subjectName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Discipline code',
    example: '543642',
  })
  subjectId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Semester data',
    example: '06-2021',
  })
  semester: string;
}
