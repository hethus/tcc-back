import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { ObjectValidator } from 'src/question/dto/questions-json.decorator';

export class CreateEvaluationDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Form Id',
    example: 'f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5e6f',
  })
  formId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicator Id',
    example: 'f1e2d3c4-b5a6-7c8d-9e1f-1a2b3c4d5e6f',
  })
  indicatorId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Class Id',
    example: 'f1e2d3c4-b5a6-7c8d-9e1f-1a2b3c4d5e64',
  })
  classId: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Initial date',
    example: '2021-01-01T00:00:00.000Z',
  })
  initialDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Final date',
    example: '2021-01-02T00:00:00.000Z',
  })
  finalDate: Date;

  @IsNotEmpty()
  @ObjectValidator()
  @ApiProperty({
    description: 'Evaluation repeat in the week',
    example: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: true,
    },
  })
  repeat: any;
}
