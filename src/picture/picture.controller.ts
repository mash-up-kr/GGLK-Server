import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PictureService } from './picture.service';

@ApiTags('Picture')
@Controller('picture')
export class PictureController {
  constructor(private readonly picturesService: PictureService) {}

  @Delete(':id')
  @ApiOperation({ summary: '사진 삭제' })
  async deletePicture(@Param('id') id: number) {
    return await this.picturesService.deletePicture(id);
  }
}
