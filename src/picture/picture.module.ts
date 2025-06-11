import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureRepository } from './picture.repository';
import { PictureService } from './picture.service';

@Module({
  controllers: [PictureController],
  providers: [PictureService, PictureRepository],
  exports: [PictureService],
})
export class PictureModule {}
