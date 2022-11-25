import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'teste',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User new password',
    example: 'teste',
  })
  newPassword: string;
}
