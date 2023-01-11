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
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { isAllowed, isAllowedOrIsMeEmail } from 'src/lib/authLib';
import enums from '../lib/enumLib';

const { userType } = enums;

@ApiTags('Evaluations')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a evaluation' })
  create(@Body() dto: CreateEvaluationDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.evaluationService.create(dto);
  }

  @Get('all/:email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all evaluations by user' })
  findAll(@Param('email') email: string, @LoggedUser() userLogged: User) {
    isAllowedOrIsMeEmail(userType.admin.value, userLogged, email);
    return this.evaluationService.findAll(email);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a evaluation by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.evaluationService.findOne(id, userLogged);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a evaluation' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEvaluationDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.evaluationService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a evaluation' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.evaluationService.remove(id, userLogged);
  }
}
