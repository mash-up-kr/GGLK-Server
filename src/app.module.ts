import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfigService } from '@gglk/common';
import { EvaluationModule } from '@gglk/evaluation/evaluation.module';
import { PictureModule } from '@gglk/picture/picture.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataSourceConfigService,
      inject: [ConfigService],
    }),
    UploadModule,
    AuthModule,
    UserModule,
    EvaluationModule,
    PictureModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
