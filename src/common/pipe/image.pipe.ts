import { Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

const MAX_LENGTH = 2240;

@Injectable()
export class ImagePipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    const metadata = await sharp(value.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    if (width >= MAX_LENGTH || height >= MAX_LENGTH) {
      value.buffer = await sharp(value.buffer)
        .resize({
          width: MAX_LENGTH,
          height: MAX_LENGTH,
          fit: 'inside',
        })
        .toBuffer();
    }

    return value;
  }
}
