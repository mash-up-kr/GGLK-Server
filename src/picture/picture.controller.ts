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
import { UserPayload } from '@gglk/auth/auth.interface';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { ImagePipe } from '@gglk/common/pipe/image.pipe';
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
  async uploadPicture(
    @GetUser() userPayload: UserPayload,
    @UploadedFile(new ImagePipe()) image: Express.Multer.File,
  ) {
    const key = uuidv4();
    const picture = await this.picturesService.savePicture({
      file: image.buffer,
      bucket: this.bucket,
      key,
      contentType: image.mimetype,
      userId: userPayload.id,
    });
    return picture.id;
  }

  @Delete(':id')
  @PictureDeleteDocs
  async deletePicture(
    @GetUser() userPayload: UserPayload,
    @Param('id') id: number,
  ) {
    return await this.picturesService.deletePicture(id, userPayload.id);
  }
}
