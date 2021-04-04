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
import { sendEmail } from 'src/config/email.config';
import { WorkRequest } from './entities/work-request.entity';

@Controller('work-requests')
export class WorkRequestsController {
  constructor(private readonly workRequestsService: WorkRequestsService) {}

  @Post()
  async create(@Body() createWorkRequestDto: CreateWorkRequestDto) {
    try {
      const workRequest = await this.workRequestsService.create(
        createWorkRequestDto,
      );
      const receiverEmail = workRequest.email;
      const subject = 'Your request is pending';
      const text = 'pending';
      const html = '<h1>Pending</h1><p>'+workRequest.job.name+'</p><br><p>phone number :'+workRequest.phoneNumber+'</p><br><p>Details : '+workRequest.description+'</p><br><p>Address : '+workRequest.street+' '+workRequest.state+' '+workRequest.zipCode+'</p>';
      await sendEmail("Hnm@bayareaservices.org", "New work request received", text, html);
      await sendEmail("ali.naustrad@gmail.com", "New work request received", text, html);
      const emailResult = await sendEmail(receiverEmail, subject, text, html);
      return emailResult;
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
      const workRequest: WorkRequest = await this.workRequestsService.update(
        +id,
        updateWorkRequestDto,
      );
      const receiverEmail = workRequest.email;
      let subject = 'Your request is ACCEPTED :D';
      let text = 'ACCEPTED';
      let html = '<h1>ACCEPTED</h1>';
      switch (workRequest.workState) {
        case 'DECLINED':
          subject = 'Your request is DECLINED :D';
          text = 'DECLINED';
          html = '<h1>DECLINED</h1>';
          break;
        case 'DONE':
          subject = 'Your request is DONE :D';
          text = 'DONE';
          html = '<h1>DONE</h1>';
          break;
        default:
          break;
      }
      const emailResult = await sendEmail(receiverEmail, subject, text, html);
      return emailResult;
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
