import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PictureModule } from '@gglk/picture/picture.module';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), PictureModule],
  providers: [CronService],
})
export class CronModule {}
