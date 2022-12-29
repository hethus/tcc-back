import { PartialType } from '@nestjs/swagger';
import { CreateMethodologyDto } from './create-methodology.dto';

export class UpdateMethodologyDto extends PartialType(CreateMethodologyDto) {}
