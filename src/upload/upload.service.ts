import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ReadStream } from 'fs';

@Injectable()
export class UploadService {
  private readonly objectStorage: S3;

  constructor(private readonly configService: ConfigService) {
    this.objectStorage = new S3({
      endpoint: this.configService.get('NCP_ENDPOINT') ?? '',
      credentials: {
        accessKeyId: this.configService.get('NCP_ACCESS_KEY_ID') ?? '',
        secretAccessKey: this.configService.get('NCP_SECRET_ACCESS_KEY') ?? '',
      },
      region: this.configService.get('NCP_REGION') ?? '',
    });
  }

  async uploadFile(file: ReadStream, bucket: string, key: string = '') {
    try {
      const uploadResult = await this.objectStorage
        .upload({
          Bucket: bucket,
          Key: key,
          Body: file,
          ACL: 'public-read',
        })
        .promise();

      return uploadResult.Location;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
