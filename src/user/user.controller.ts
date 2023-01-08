/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import enums from '../lib/enumLib';
import { isAllowed, isAllowedOrIsMeEmail } from 'src/lib/authLib';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreatePasswordDto } from './dto/create-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

const { userType } = enums;

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() dto: CreateUserDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.userService.create(dto, userLogged);
  }

  @Patch('first-access/:tokenCrypt')
  @ApiOperation({ summary: 'Change password for new user' })
  firstAccess(
    @Param('tokenCrypt') tokenCrypt: string,
    @Body() dto: CreatePasswordDto,
  ) {
    return this.userService.firstAccess(tokenCrypt, dto);
  }

  @Get('recovery/verify/:email')
  @ApiOperation({
    summary: 'Send email to recovery password',
  })
  sendEmailForgotPassword(@Param('email') email: string): Promise<string> {
    return this.userService.sendEmailForgotPassword(email);
  }

  @Patch('recovery/password/:tokenCrypt')
  @ApiOperation({
    summary: 'Recover user password',
  })
  changePassword(
    @Param('tokenCrypt') tokenCrypt: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.userService.changePassword(tokenCrypt, dto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all users by email logged user' })
  findAll() {
    return this.userService.findAll()
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged user' })
  findLogged(@LoggedUser() user: User) {
    return this.userService.findLogged(user);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by user email' })
  findOne(@Param('email') email: string, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.userService.findOne(email);
  }

  @Patch(':email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  update(
    @Param('email') email: string,
    @Body() dto: UpdateUserDto,
    @LoggedUser() user: User,
  ) {
    isAllowedOrIsMeEmail(userType.admin.value, user, email);
    return this.userService.update(email, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.userService.remove(id, user);
  }
}
