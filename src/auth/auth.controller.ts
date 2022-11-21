import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto, LogoutResponseDto } from './dto/response';
import { LoggedUser } from './logged-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login receiving a token for authentication',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Logout user',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  logout(@LoggedUser() user: User): Promise<LogoutResponseDto> {
    return this.authService.logout(user);
  }

  @Get('/is-authenticated')
  @ApiOperation({
    summary: 'Returns the currently authenticated user',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  profile(@LoggedUser() user: User) {
    return { message: `${user.name} successfully logged in!` };
  }
}
