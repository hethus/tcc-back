import { Injectable } from '@nestjs/common';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import enums from '../lib/enumLib';

@Injectable()
export class PublicService {
  /*   create(createPublicDto: CreatePublicDto) {
    return 'This action adds a new public';
  } */

  findAll() {
    return enums;
  }

  /*   findOne(id: number) {
    return `This action returns a #${id} public`;
  }

  update(id: number, updatePublicDto: UpdatePublicDto) {
    return `This action updates a #${id} public`;
  }

  remove(id: number) {
    return `This action removes a #${id} public`;
  } */
}
