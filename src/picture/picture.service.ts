import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Picture } from '@gglk/picture/entities/picture.entity';
import { UploadService } from '@gglk/upload/upload.service';
import { PictureRepository } from './picture.repository';

@Injectable()
export class PictureService {
  private readonly bucket: string;

  constructor(
    private readonly pictureRepository: PictureRepository,
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get('NCP_BUCKET') ?? '';
  }

  async savePicture(url: string, key: string): Promise<Picture> {
    return await this.pictureRepository.savePicture(url, key);
  }

  async updatePicture(id: number, url: string) {
    await this.pictureRepository.updatePicture(id, url);
  }

  async getPicture(id: number) {
    return await this.pictureRepository.getPicture(id);
  }

  async deletePicture(id: number) {
    const picture = await this.pictureRepository.findOne({ where: { id } });
    if (!picture) {
      throw new Error();
    }
    await this.uploadService.deleteFile(picture.key, this.bucket);
    return this.pictureRepository.remove(picture);
  }
}
