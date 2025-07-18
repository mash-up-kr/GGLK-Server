import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfigService } from '@gglk/common';
import { EvaluationModule } from '@gglk/evaluation/evaluation.module';
import { PictureModule } from '@gglk/picture/picture.module';
import { AiModule } from './ai/ai.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { RedisModule } from './redis/redis.module';
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
    UserModule,
    AuthModule,
    EvaluationModule,
    PictureModule,
    CronModule,
    AiModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
