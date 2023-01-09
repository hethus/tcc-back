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
import { MethodologyService } from './methodology.service';
import { CreateMethodologyDto } from './dto/create-methodology.dto';
import { UpdateMethodologyDto } from './dto/update-methodology.dto';
import enums from '../lib/enumLib';
import { isAllowed, isAllowedOrIsMeEmail } from 'src/lib/authLib';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';

const { userType } = enums;

@ApiTags('Methodologies')
@Controller('methodology')
export class MethodologyController {
  constructor(private readonly methodologyService: MethodologyService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new methodology' })
  create(@Body() dto: CreateMethodologyDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.methodologyService.create(dto, userLogged);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all methodology by user' })
  findAll(@Param('email') email: string, @LoggedUser() userLogged: User) {
    isAllowedOrIsMeEmail(userType.admin.value, userLogged, email);
    return this.methodologyService.findAll(email);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a methodology by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.methodologyService.findOne(id, userLogged);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a methodology by id' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMethodologyDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.methodologyService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a methodology by id' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.methodologyService.remove(id, userLogged);
  }
}
