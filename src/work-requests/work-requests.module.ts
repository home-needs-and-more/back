import { Module } from '@nestjs/common';
import { WorkRequestsService } from './work-requests.service';
import { WorkRequestsController } from './work-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRequest } from './entities/work-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkRequest])],
  controllers: [WorkRequestsController],
  providers: [WorkRequestsService],
})
export class WorkRequestsModule {}
