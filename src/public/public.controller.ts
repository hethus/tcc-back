import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Public')
@Controller('enums')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  /*   @Post()
  create(@Body() createPublicDto: CreatePublicDto) {
    return this.publicService.create(createPublicDto);
  } */

  @Get()
  @ApiOperation({ summary: 'List all enums' })
  findAll() {
    return this.publicService.findAll();
  }

  /*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicDto: UpdatePublicDto) {
    return this.publicService.update(+id, updatePublicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicService.remove(+id);
  } */
}
