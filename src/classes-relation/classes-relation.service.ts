import { Injectable } from '@nestjs/common';
import { CreateClassesRelationDto } from './dto/create-classes-relation.dto';
import { UpdateClassesRelationDto } from './dto/update-classes-relation.dto';

@Injectable()
export class ClassesRelationService {
  create(createClassesRelationDto: CreateClassesRelationDto) {
    return 'This action adds a new classesRelation';
  }

  findAll() {
    return `This action returns all classesRelation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classesRelation`;
  }

  delete(id: number) {
    return `This action removes a #${id} classesRelation`;
  }
}
