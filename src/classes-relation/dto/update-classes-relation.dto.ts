import { PartialType } from '@nestjs/swagger';
import { CreateClassesRelationDto } from './create-classes-relation.dto';

export class UpdateClassesRelationDto extends PartialType(CreateClassesRelationDto) {}
