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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { isAllowed } from 'src/lib/authLib';
import enums from '../lib/enumLib';
import { ClasseService } from './classe.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';

const { userType } = enums;

@ApiTags('Classes')
@Controller('classe')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new classe' })
  create(@Body() dto: CreateClasseDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.classeService.create(dto, userLogged);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all classes by user email' })
  findAll(@Param('email') email: string) {
    return this.classeService.findAll(email);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find classe by id' })
  findOne(@Param('id') id: string) {
    return this.classeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updated class by id' })
  update(@Param('id') id: string, @Body() dto: UpdateClasseDto) {
    return this.classeService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete class by id' })
  delete(@Param('id') id: string) {
    return this.classeService.delete(id);
  }
}
