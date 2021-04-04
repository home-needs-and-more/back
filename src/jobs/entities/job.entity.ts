import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WorkRequest } from '../../work-requests/entities/work-request.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description : string;

  @Column()
  image : string;

  @Column()
  price : string;

  @OneToMany((type) => WorkRequest, (workRequest) => workRequest.job)
  workRequests: WorkRequest[];
}
