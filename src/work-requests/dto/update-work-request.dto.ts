import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { WorkStatus } from '../entities/work-status.enum';
import { CreateWorkRequestDto } from './create-work-request.dto';

export class UpdateWorkRequestDto extends PartialType(CreateWorkRequestDto) {
  @IsNotEmpty()
  workState: WorkStatus;
}
