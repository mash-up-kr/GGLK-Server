import { Controller } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * @Todo
   * Upload File API 구현 예정 by 재영 or 미나
   */
}
