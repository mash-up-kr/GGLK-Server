import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private async backupDatabase() {}
  @Cron('00 03 * * *', {
    timeZone: 'Asia/Seoul',
  })
  async eventDayAtThree() {
    await this.backupDatabase();
  }
}
