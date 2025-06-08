import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { PictureService } from './picture.service';

@ApiTags('Picture')
@Controller('picture')
export class PictureController {
  private readonly bucket: string;

  constructor(
    private readonly picturesService: PictureService,
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
    const picture = await this.picturesService.savePicture(
      image.buffer,
      this.bucket,
      key,
    );
    return picture.id;
  }

  @Delete(':id')
  @ApiOperation({ summary: '사진 삭제' })
  async deletePicture(@Param('id') id: number) {
    return await this.picturesService.deletePicture(id);
  }
}
