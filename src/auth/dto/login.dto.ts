import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'email@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'teste',
  })
  password: string;
}
