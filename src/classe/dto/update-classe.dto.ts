import { PartialType } from '@nestjs/swagger';
import { CreateClasseDto } from './create-classe.dto';

export class UpdateClasseDto extends PartialType(CreateClasseDto) {}
