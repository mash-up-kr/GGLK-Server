import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '@gglk/auth/guard/jwt.guard';
import { UserType } from '@gglk/common/decorator/user-type.decorator';
import { UserTypeGuard } from '@gglk/common/guard/user-type.guard';
import {
  PictureControllerDocs,
  PictureDeleteDocs,
  PictureUploadDocs,
} from '@gglk/picture/docs';
import { PictureService } from './picture.service';

@Controller('picture')
@UserType(['USER', 'GUEST'])
@UseGuards(JwtAuthGuard, UserTypeGuard)
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
