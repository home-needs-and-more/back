import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { IsEmail, Length, Matches } from 'class-validator';
import { WorkStatus } from './work-status.enum';
import { Job } from 'src/jobs/entities/job.entity';

@Entity()
export class WorkRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  phoneNumber: string;

  @Column()
  @Length(10, 512)
  description: string;

  @Column()
  @Length(1, 80)
  street: string;

  @Column()
  @Length(1, 80)
  city: string;

  @Column()
  @Length(1, 25)
  state: string;

  @Column()
  zipCode: number;

  @Column({
    type: 'enum',
    enum: WorkStatus,
    default: WorkStatus.PENDING,
  })
  workState: string;

  @ManyToOne((type) => Job, {
    cascade: true,
  })
  @JoinTable({ name: 'jobId' })
  job: Job;
}
