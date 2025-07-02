import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT, RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(RedisModule.name);
        const redis = new Redis({
          host: configService.get('REDIS_HOST') ?? '127.0.0.1',
          port: configService.get('REDIS_PORT') ?? 6379,
          lazyConnect: true,
        });

        redis.on('error', (err) => {
          logger.error('Redis connection error:', err);
        });

        redis.on('connect', () => {
          logger.log('Connected to Redis');
        });

        return redis;
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
