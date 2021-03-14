import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkRequestsService } from './work-requests.service';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { UpdateWorkRequestDto } from './dto/update-work-request.dto';

@Controller('work-requests')
export class WorkRequestsController {
  constructor(private readonly workRequestsService: WorkRequestsService) {}

  @Post()
  create(@Body() createWorkRequestDto: CreateWorkRequestDto) {
    return this.workRequestsService.create(createWorkRequestDto);
  }

  @Get()
  findAll() {
    return this.workRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workRequestsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkRequestDto: UpdateWorkRequestDto,
  ) {
    return this.workRequestsService.update(+id, updateWorkRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workRequestsService.remove(+id);
  }
}
