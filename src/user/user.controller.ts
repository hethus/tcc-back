import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import enums from '../lib/enumLib';
import { isAllowed, isAllowedOrIsMe } from 'src/lib/authLib';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

const { userType } = enums;

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() dto: CreateUserDto, @LoggedUser() user: User) {
    isAllowed([userType.admin.value, userType.teacher.value], user);
    return this.userService.create(dto);
  }

  /*   @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  } */

  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @LoggedUser() user: User,
  ) {
    isAllowedOrIsMe(userType.admin.value, user, id);
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a user' })
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.userService.remove(id, user);
  }
}
