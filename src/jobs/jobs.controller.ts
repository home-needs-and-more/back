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
  create(@Body() createJobDto: CreateJobDto) {
    try {
      return this.jobsService.create(createJobDto);
    } catch (error) {
      console.error('Error while creating job');
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while creating job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.jobsService.findAll();
    } catch (error) {
      console.error('Error while getting jobs');
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while getting jobs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.jobsService.findOne(+id);
    } catch (error) {
      console.error('Error while getting job');
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while getting job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    try {
      return this.jobsService.update(+id, updateJobDto);
    } catch (error) {
      console.error('Error while updating job');
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while getting job',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.jobsService.remove(+id);
    } catch (error) {
      console.error('Error while deleting jobs');
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while deleting jobs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
