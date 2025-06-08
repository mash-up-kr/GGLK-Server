import { Module, forwardRef } from '@nestjs/common';
import { UploadModule } from '@gglk/upload/upload.module';
import { PictureController } from './picture.controller';
import { PictureRepository } from './picture.repository';
import { PictureService } from './picture.service';

@Module({
  imports: [forwardRef(() => UploadModule)],
  controllers: [PictureController],
  providers: [PictureService, PictureRepository],
  exports: [PictureService],
})
export class PictureModule {}
