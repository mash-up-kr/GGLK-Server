import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { OnlyRunInProduction } from '@gglk/common/decorator/only-run-in-production.decorator';
import { UploadService } from '@gglk/upload/upload.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly backupDir = 'tmp/backup';

  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  private ensureBackupDirExists() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  private changeTimeToFileName(time: Date) {
    return time.toISOString().replace(/[:.]/g, '-');
  }

  private compressAndUpload(sqlPath: string, gzPath: string) {
    this.logger.log('Starting compress');

    const gzip = spawn('gzip', [sqlPath]);

    gzip.on('close', (code) => {
      if (code !== 0) {
        this.logger.error(`Failed to compress gzip (Code: ${code})`);
        return;
      }

      const fileStream = fs.createReadStream(gzPath);
      const s3Key = `db-backup/${path.basename(gzPath)}`;
      const bucket = this.configService.get<string>('NCP_BUCKET_NAME') ?? '';

      void this.uploadService.uploadFile(fileStream, bucket, s3Key).then(() => {
        fs.unlinkSync(gzPath);
        this.logger.error(
          `DB backup in object storage is completed (Code: ${code})`,
        );
      });
    });
  }

  private backupDatabase() {
    this.ensureBackupDirExists();

    const timestamp = this.changeTimeToFileName(new Date());
    const filename = `db-backup-${timestamp}.sql`;
    const filepath = path.join(this.backupDir, filename);
    const gzFilepath = `${filepath}.gz`;

    const DB_NAME = process.env.DB_NAME ?? '';
    const DB_ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD;

    this.logger.log('Starting MySQL backup...');

    const dump = spawn('docker', [
      'exec',
      'mysql',
      'mysqldump',
      '-u',
      'root',
      `-p${DB_ROOT_PASSWORD}`,
      DB_NAME,
    ]);

    const fileStream = fs.createWriteStream(filepath);
    dump.stdout.pipe(fileStream);

    dump.stderr.on('data', (data) => {
      this.logger.error(`mysqldump stderr: ${data}`);
    });

    dump.on('close', (code) => {
      if (code !== 0) {
        this.logger.error(`mysqldump process end code: ${code}`);
        return;
      }

      this.logger.log(`backup file generated in local completed: ${filepath}`);
      void this.compressAndUpload(filepath, gzFilepath);
    });
  }

  @Cron('00 03 * * *', {
    timeZone: 'Asia/Seoul',
  })
  @OnlyRunInProduction()
  eventDayAtThree() {
    this.backupDatabase();
  }
}
