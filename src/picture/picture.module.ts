import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { PictureController } from './picture.controller';
import { PictureRepository } from './picture.repository';
import { PictureService } from './picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  controllers: [PictureController],
  providers: [PictureService, PictureRepository],
  exports: [PictureService],
})
export class PictureModule {}
