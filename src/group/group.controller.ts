import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import enums from '../lib/enumLib';
import { isAllowed, isAllowedOrIsMeEmail } from 'src/lib/authLib';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

const { userType } = enums;

@ApiTags('Groups')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new group' })
  create(@Body() dto: CreateGroupDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.groupService.create(dto, userLogged);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all group by user' })
  findAll(@Param('email') email: string, @LoggedUser() userLogged: User) {
    isAllowedOrIsMeEmail(userType.admin.value, userLogged, email);
    return this.groupService.findAll(email);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a group by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.groupService.findOne(id, userLogged);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a group by id' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGroupDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.groupService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a indicator by id' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.groupService.remove(id, userLogged);
  }
}
