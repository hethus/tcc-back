/* eslint-disable prettier/prettier */
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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import enums from '../lib/enumLib';
import { isAllowed } from 'src/lib/authLib';

const { userType } = enums;

@ApiTags('Questions')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new question in a form' })
  create(@Body() dto: CreateQuestionDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.questionService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a question by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.questionService.findOne(id, userLogged);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a question by id' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.questionService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a question by id' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.questionService.remove(id, userLogged);
  }
}
