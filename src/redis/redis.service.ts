import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CHECK_IF_CHANGE_USED_KEY, REDIS_CLIENT } from './redis.constant';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  private readonly UUID_INDEX_HASH = 'uuid:index';
  private readonly INDEX_SEQ_KEY = 'uuid:index:seq';

  private async changeUUIDToIndex(uuid: string) {
    let index = await this.redisClient.hget(this.UUID_INDEX_HASH, uuid);
    if (index === null) {
      const newIndex = await this.redisClient.incr(this.INDEX_SEQ_KEY);

      await this.redisClient.hset(
        this.UUID_INDEX_HASH,
        uuid,
        newIndex.toString(),
      );

      index = newIndex.toString();
    }

    return parseInt(index, 10);
  }

  async checkIfUseChanceByBitmap(userId: string): Promise<boolean> {
    const index = await this.changeUUIDToIndex(userId);

    const isUsed = await this.redisClient.getbit(
      REDIS_CHECK_IF_CHANGE_USED_KEY,
      index,
    );

    return !!isUsed;
  }

  async setChangeUsed(userId: string): Promise<void> {
    const index = await this.changeUUIDToIndex(userId);

    await this.redisClient.setbit(REDIS_CHECK_IF_CHANGE_USED_KEY, index, 1);
  }
}
export { REDIS_CLIENT };
