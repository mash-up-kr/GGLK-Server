import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OnlyRunInProduction } from '@gglk/common/decorator/only-run-in-production.decorator';

@Injectable()
export class CronService {
  private async backupDatabase() {}
  @Cron('00 03 * * *', {
    timeZone: 'Asia/Seoul',
  })
  @OnlyRunInProduction()
  async eventDayAtThree() {
    await this.backupDatabase();
  }
}
