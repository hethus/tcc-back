import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClassesRelationService } from './classes-relation.service';
import { CreateClassesRelationDto } from './dto/create-classes-relation.dto';

@Controller('classes-relation')
export class ClassesRelationController {
  constructor(
    private readonly classesRelationService: ClassesRelationService,
  ) {}

  @Post()
  create(@Body() createClassesRelationDto: CreateClassesRelationDto) {
    return this.classesRelationService.create(createClassesRelationDto);
  }

  @Get()
  findAll() {
    return this.classesRelationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesRelationService.findOne(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classesRelationService.delete(+id);
  }
}
