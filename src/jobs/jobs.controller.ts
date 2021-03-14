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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    try {
      return await this.jobsService.create(createJobDto);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while creating job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.jobsService.findAll();
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while getting jobs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.jobsService.findOne(+id);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while getting job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    try {
      return await this.jobsService.update(+id, updateJobDto);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while updating job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.jobsService.remove(+id);
    } catch (error) {
      console.error(error);
      return new HttpException(
        {
          error: 'Error while deleting job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
