import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  findOne(id: number): Promise<Job> {
    return this.jobsRepository.findOne(id);
  }

  create(createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsRepository.save(createJobDto);
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const job: Job = await this.findOne(id);
    job.name = updateJobDto.name;
    return this.jobsRepository.save(job);
  }

  async remove(id: number): Promise<void> {
    await this.jobsRepository.delete(id);
  }
}
