import { Module, forwardRef } from '@nestjs/common';
import { PictureModule } from '@gglk/picture/picture.module';
import { UploadController } from '@gglk/upload/upload.controller';
import { UploadService } from '@gglk/upload/upload.service';

@Module({
  imports: [forwardRef(() => PictureModule)],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
