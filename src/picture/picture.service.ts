import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { PictureRepository } from './picture.repository';

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
        accessKeyId: this.configService.get('NCP_ACCESS_KEY') ?? '',
        secretAccessKey: this.configService.get('NCP_SECRET_ACCESS_KEY') ?? '',
      },
      region: this.configService.get('NCP_REGION') ?? '',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  async savePicture(
    file: ReadStream | Buffer,
    bucket: string,
    key: string,
    contentType: string,
  ) {
    try {
      const uploadResult = await this.objectStorage
        .upload({
          Bucket: bucket,
          Key: key,
          Body: file instanceof Buffer ? Readable.from(file) : file,
          ACL: 'public-read',
          ContentType: contentType,
        })
        .promise();

      const url = uploadResult.Location;
      return this.pictureRepository.savePicture(url, key);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePicture(id: number) {
    const picture = await this.pictureRepository.findOne({ where: { id } });
    if (!picture) {
      throw new Error('picture not found');
    }
    await this.pictureRepository.remove(picture);
    return this.objectStorage
      .deleteObject({
        Bucket: this.bucket,
        Key: picture.key,
      })
      .promise();
  }

  async getPicture(id: number) {
    return await this.pictureRepository.getPicture(id);
  }
}
