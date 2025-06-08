import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { PictureService } from '@gglk/picture/picture.service';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  private readonly bucket: string;
  constructor(
    private readonly uploadService: UploadService,
    private readonly pictureService: PictureService,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get('NCP_BUCKET') ?? '';
  }

  @Post()
  @ApiOperation({ summary: '사진 업로드 및 저장' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadPicture(@UploadedFile() image: Express.Multer.File) {
    const key = uuidv4();
    const url = await this.uploadService.uploadFile(
      image.buffer,
      this.bucket,
      key,
    );
    return this.pictureService.savePicture(url, key);
  }
}
