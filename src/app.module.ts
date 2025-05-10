import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfigService } from '@gglk/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { PicturesModule } from './pictures/pictures.module';
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
    EvaluationsModule,
    PicturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
