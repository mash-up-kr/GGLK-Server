import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ReadStream } from 'fs';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly objectStorage: S3;

  constructor(private readonly configService: ConfigService) {
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

  async uploadFile(file: ReadStream | Buffer, bucket: string, key: string) {
    try {
      const uploadResult = await this.objectStorage
        .upload({
          Bucket: bucket,
          Key: key,
          Body: file instanceof Buffer ? Readable.from(file) : file,
          ACL: 'public-read',
        })
        .promise();

      return uploadResult.Location;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFile(key: string, bucket: string) {
    return this.objectStorage
      .deleteObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();
  }
}
