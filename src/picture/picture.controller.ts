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
import { v4 as uuidv4 } from 'uuid';
import {
  PictureControllerDocs,
  PictureDeleteDocs,
  PictureUploadDocs,
} from '@gglk/picture/docs';
import { PictureControllerGuardDefinition } from './decorators/picture-controller.decorator';
import { PictureService } from './picture.service';

@Controller('picture')
@PictureControllerGuardDefinition
@PictureControllerDocs
export class PictureController {
  private readonly bucket: string;

  constructor(
    private readonly picturesService: PictureService,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get('NCP_BUCKET') ?? '';
  }

  @Post()
  @PictureUploadDocs
  @UseInterceptors(FileInterceptor('image'))
  async uploadPicture(@UploadedFile() image: Express.Multer.File) {
    const key = uuidv4();
    const picture = await this.picturesService.savePicture(
      image.buffer,
      this.bucket,
      key,
      image.mimetype,
    );
    return picture.id;
  }

  @Delete(':id')
  @PictureDeleteDocs
  async deletePicture(@Param('id') id: number) {
    return await this.picturesService.deletePicture(id);
  }
}
