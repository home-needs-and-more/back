import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkRequestsService } from './work-requests.service';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { UpdateWorkRequestDto } from './dto/update-work-request.dto';

@Controller('work-requests')
export class WorkRequestsController {
  constructor(private readonly workRequestsService: WorkRequestsService) {}

  @Post()
  async create(@Body() createWorkRequestDto: CreateWorkRequestDto) {
    try {
      return await this.workRequestsService.create(createWorkRequestDto);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while creating work request',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.workRequestsService.findAll();
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while getting work requests',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.workRequestsService.findOne(+id);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while creating work request',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkRequestDto: UpdateWorkRequestDto,
  ) {
    try {
      return await this.workRequestsService.update(+id, updateWorkRequestDto);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while updating work request',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.workRequestsService.remove(+id);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while deleting work request',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
