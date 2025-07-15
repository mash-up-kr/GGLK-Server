import { Injectable, PipeTransform } from '@nestjs/common';
import sharp from 'sharp';

const MAX_LENGTH = 2240;

@Injectable()
export class ImagePipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    const metadata = await sharp(value.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    if (width >= MAX_LENGTH || height >= MAX_LENGTH) {
      const resizeOptions =
        width >= height ? { width: MAX_LENGTH } : { height: MAX_LENGTH };

      value.buffer = await sharp(value.buffer).resize(resizeOptions).toBuffer();
    }

    return value;
  }
}
