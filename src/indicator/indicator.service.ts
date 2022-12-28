import { Injectable } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';

@Injectable()
export class IndicatorService {
  create(dto: CreateIndicatorDto) {
    return 'This action adds a new indicator';
  }

  findAll() {
    return `This action returns all indicator`;
  }

  findOne(id: string) {
    return `This action returns a #${id} indicator`;
  }

  update(id: string, dto: UpdateIndicatorDto) {
    return `This action updates a #${id} indicator`;
  }

  remove(id: string) {
    return `This action removes a #${id} indicator`;
  }
}
