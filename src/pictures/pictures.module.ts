import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { PicturesController } from './pictures.controller';
import { PictureRepository } from './pictures.repository';
import { PicturesService } from './pictures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  controllers: [PicturesController],
  providers: [PicturesService, PictureRepository],
  exports: [PicturesService],
})
export class PicturesModule {}
