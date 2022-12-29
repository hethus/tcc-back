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
import { IndicatorService } from './indicator.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { isAllowed, isAllowedOrIsMeEmail } from 'src/lib/authLib';
import { User } from 'src/user/entities/user.entity';
import { RelationIndicatorDto } from './dto/relation-indicator.dto';
import enums from '../lib/enumLib';

const { userType } = enums;

@ApiTags('Indicators')
@Controller('indicator')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new indicator' })
  create(@Body() dto: CreateIndicatorDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.indicatorService.create(dto, userLogged);
  }

  @Post('add/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a form to an indicator by id' })
  addForm(
    @Param('id') id: string,
    @Body() dto: RelationIndicatorDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.indicatorService.addForm(id, dto, userLogged);
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a form to an indicator by id' })
  removeForm(
    @Param('id') id: string,
    @Body() dto: RelationIndicatorDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.indicatorService.removeForm(id, dto, userLogged);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all indicators by user' })
  findAll(@Param('email') email: string, @LoggedUser() userLogged: User) {
    isAllowedOrIsMeEmail(userType.admin.value, userLogged, email);
    return this.indicatorService.findAll(email);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a indicator by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.indicatorService.findOne(id, userLogged);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a indicator by id' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIndicatorDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.indicatorService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a indicator by id' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.indicatorService.remove(id, userLogged);
  }
}
