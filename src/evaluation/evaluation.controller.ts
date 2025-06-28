import { Body, Controller, Post } from '@nestjs/common';
import { OotdRoastingRequestDto } from '@gglk/ai/dto';
import { UserPayload } from '@gglk/auth/auth.interface';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { OotdRoastingDocs } from './docs';
import { EvaluationResponseDto } from './dto';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationsService: EvaluationService) {}

  @Post('ootd')
  @OotdRoastingDocs
  async doOotdRoasting(
    @GetUser() userPayload: UserPayload,
    @Body() dto: OotdRoastingRequestDto,
  ): Promise<EvaluationResponseDto> {
    const ootdEvaluation = await this.evaluationsService.createWithRoasting(
      dto.imageId,
      dto.spicyLevel,
      userPayload.id,
    );
    return new EvaluationResponseDto(ootdEvaluation);
  }
}
