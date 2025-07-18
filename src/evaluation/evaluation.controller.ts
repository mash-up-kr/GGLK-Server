import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OotdRoastingRequestDto } from '@gglk/ai/dto';
import { UserPayload } from '@gglk/auth/auth.interface';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { RedisBadRequestException } from '@gglk/redis/exceptions/picture-not-found.exception';
import { RedisService } from '@gglk/redis/redis.service';
import { EvaluationControllerGuardDefinition } from './decorators';
import {
  CheckEvaluationDocs,
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
  constructor(
    private readonly evaluationsService: EvaluationService,
    private readonly redisService: RedisService,
  ) {}

  @Get('guest-used')
  @CheckEvaluationDocs
  async checkIfGuestUserUseChance(@GetUser() userPayload: UserPayload) {
    if (userPayload.tokenType === 'USER') {
      return false;
    }
    return this.redisService.checkIfUseChanceByBitmap(userPayload.id);
  }

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
    const isGuest = userPayload.tokenType === 'GUEST';
    if (isGuest) {
      const noChance = await this.redisService.checkIfUseChanceByBitmap(
        userPayload.id,
      );

      if (noChance) {
        throw new RedisBadRequestException();
      }
    }

    const ootdEvaluation = await this.evaluationsService.createWithRoasting(
      dto.imageId,
      dto.spicyLevel,
      userPayload.id,
    );

    if (isGuest) {
      await this.redisService.setChanceUsed(userPayload.id);
    }
    return new EvaluationResponseDto(ootdEvaluation);
  }
}
