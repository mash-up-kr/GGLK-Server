import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { Picture } from '@gglk/picture/entities/picture.entity';
import {
  NCPNetworkErrorException,
  PictureNotFoundException,
} from '@gglk/picture/exceptions';
import { PictureRepository } from './picture.repository';

interface SaveFileProps {
  file: ReadStream | Buffer;
  bucket: string;
  key: string;
  contentType: string;
}

@Injectable()
export class PictureService {
  private readonly bucket: string;
  private readonly objectStorage: S3;

  constructor(
    private readonly pictureRepository: PictureRepository,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get('NCP_BUCKET') ?? '';
    this.objectStorage = new S3({
      endpoint: this.configService.get('NCP_ENDPOINT') ?? '',
      credentials: {
        accessKeyId: this.configService.get('NCP_ACCESS_KEY_ID') ?? '',
        secretAccessKey: this.configService.get('NCP_SECRET_ACCESS_KEY') ?? '',
      },
      region: this.configService.get('NCP_REGION') ?? '',
    });
  }

  async saveFile({ file, bucket, key, contentType }: SaveFileProps) {
    return await this.objectStorage
      .upload({
        Bucket: bucket,
        Key: key,
        Body: file instanceof Buffer ? Readable.from(file) : file,
        ACL: 'public-read',
        ContentType: contentType,
      })
      .promise();
  }

  async savePicture({
    file,
    bucket,
    key,
    contentType,
    userId,
  }: SaveFileProps & { userId: string }): Promise<Picture> {
    try {
      const uploadResult = await this.saveFile({
        file,
        bucket,
        key,
        contentType,
      });

      const url = uploadResult.Location;
      const picture = this.pictureRepository.create({
        url,
        key,
        user: { id: userId },
      });
      return this.pictureRepository.save(picture);
    } catch {
      throw new NCPNetworkErrorException();
    }
  }

  async deletePicture(id: number, userId: string): Promise<void> {
    const picture = await this.pictureRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!picture) {
      throw new PictureNotFoundException();
    }
    await this.pictureRepository.remove(picture);

    try {
      await this.objectStorage
        .deleteObject({
          Bucket: this.bucket,
          Key: picture.key,
        })
        .promise();
    } catch {
      throw new NCPNetworkErrorException();
    }
  }

  async getPicture(id: number) {
    return await this.pictureRepository.findOne({ where: { id } });
  }
}
