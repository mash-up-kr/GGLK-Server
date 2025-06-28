import { Body, Controller, Post } from '@nestjs/common';
import { UserPayload } from '@gglk/auth/auth.interface';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { AiService } from './ai.service';
import { AiControllerGuardDefinition } from './decorators';
import { AiControllerDocs, OotdRoastingDocs } from './docs';
import { OotdRoastingRequestDto, OotdRoastingResponseDto } from './dto';

@Controller('ai')
@AiControllerGuardDefinition
@AiControllerDocs
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('ootd')
  @OotdRoastingDocs
  async doOotdRoasting(
    @GetUser() userPayload: UserPayload,
    @Body() dto: OotdRoastingRequestDto,
  ): Promise<OotdRoastingResponseDto> {
    const ootdEvaluation = await this.aiService.invokeAiOotdRoasting(
      dto.imageId,
      dto.spicyLevel,
      userPayload.id,
    );
    return new OotdRoastingResponseDto(ootdEvaluation);
  }
}
