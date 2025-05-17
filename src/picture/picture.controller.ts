import { Controller } from '@nestjs/common';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
  constructor(private readonly picturesService: PictureService) {}
}
