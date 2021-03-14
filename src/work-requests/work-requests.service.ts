import { Injectable } from '@nestjs/common';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { UpdateWorkRequestDto } from './dto/update-work-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkRequest } from './entities/work-request.entity';

@Injectable()
export class WorkRequestsService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestsRepository: Repository<WorkRequest>,
  ) {}

  findAll(): Promise<WorkRequest[]> {
    return this.workRequestsRepository.find({ relations: ['job'] });
  }

  findOne(id: number): Promise<WorkRequest> {
    return this.workRequestsRepository.findOne(id, { relations: ['job'] });
  }

  create(createworkRequestDto: CreateWorkRequestDto): Promise<WorkRequest> {
    return this.workRequestsRepository.save(createworkRequestDto);
  }

  async update(
    id: number,
    updateWorkRequestDto: UpdateWorkRequestDto,
  ): Promise<WorkRequest> {
    const workRequest: WorkRequest = await this.findOne(id);
    workRequest.jobId = updateWorkRequestDto.jobId;
    workRequest.email = updateWorkRequestDto.email;
    workRequest.description = updateWorkRequestDto.description;
    workRequest.phoneNumber = updateWorkRequestDto.phoneNumber;
    workRequest.street = updateWorkRequestDto.street;
    workRequest.city = updateWorkRequestDto.city;
    workRequest.state = updateWorkRequestDto.state;
    workRequest.zipCode = updateWorkRequestDto.zipCode;
    return this.workRequestsRepository.save(workRequest);
  }

  async remove(id: number): Promise<void> {
    await this.workRequestsRepository.delete(id);
  }
}
