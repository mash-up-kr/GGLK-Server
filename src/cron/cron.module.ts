import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from '@gglk/upload/upload.module';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), UploadModule],
  providers: [CronService],
})
export class CronModule {}
