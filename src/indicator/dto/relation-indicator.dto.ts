import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RelationIndicatorDto {
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicator forms id',
    example: [
      'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
      'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
    ],
  })
  formsId: string[];
}
