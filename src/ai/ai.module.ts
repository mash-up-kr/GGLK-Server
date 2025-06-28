import { Module } from '@nestjs/common';
import { PictureRepository } from '@gglk/picture/picture.repository';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  controllers: [AiController],
  providers: [PictureRepository, AiService],
  exports: [AiService],
})
export class AiModule {}
