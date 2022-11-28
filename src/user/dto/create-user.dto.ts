import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'teste@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User registration',
    example: 'teste',
  })
  registration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User type',
    example: 'teacher',
  })
  userType: string;
}
