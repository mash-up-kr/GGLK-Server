import { Injectable } from '@nestjs/common';
import { PictureRepository } from './picture.repository';

@Injectable()
export class PictureService {
  constructor(private readonly pictureRepository: PictureRepository) {}
}
