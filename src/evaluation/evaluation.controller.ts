import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OotdRoastingRequestDto } from '@gglk/ai/dto';
import { UserPayload } from '@gglk/auth/auth.interface';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { EvaluationControllerGuardDefinition } from './decorators';
import {
  EvaluationControllerDocs,
  GetEvaluationDocs,
  OotdRoastingDocs,
} from './docs';
import { EvaluationItemResponseDto, EvaluationResponseDto } from './dto';
import { EvaluationService } from './evaluation.service';
import { EvaluationNotFoundException } from './exceptions/evaluation-not-found.exception';

@Controller('evaluation')
@EvaluationControllerDocs
@EvaluationControllerGuardDefinition
export class EvaluationController {
  constructor(private readonly evaluationsService: EvaluationService) {}

  @Get(':id')
  @GetEvaluationDocs
  async getEvaluationById(
    @Param('id') id: number,
  ): Promise<EvaluationItemResponseDto> {
    const evaluation = await this.evaluationsService.findById(id);

    if (!evaluation) throw new EvaluationNotFoundException();

    return new EvaluationItemResponseDto(evaluation);
  }

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
