import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isAllowed } from 'src/lib/authLib';
import { ClassesRelationService } from './classes-relation.service';
import { User } from 'src/user/entities/user.entity';
import enums from '../lib/enumLib';
import { CreateClassesRelationDto } from './dto/create-classes-relation.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';

const { userType } = enums;

@ApiTags('Classes-Relation')
@Controller('classes-relation')
export class ClassesRelationController {
  constructor(
    private readonly classesRelationService: ClassesRelationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new relation' })
  create(
    @Body() dto: CreateClassesRelationDto,
    @LoggedUser() userLogged: User,
  ) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.classesRelationService.create(dto, userLogged);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a relation' })
  findOne(@Param('id') id: string) {
    return this.classesRelationService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a relation' })
  delete(@Param('id') id: string) {
    return this.classesRelationService.delete(id);
  }
}
