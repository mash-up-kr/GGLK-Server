import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
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
    // Guest인 경우 Service Layer에서 이런식으로 처리하면 되요
    if (userPayload.tokenType === 'GUEST') {
      throw new NotImplementedException();
    }

    const ootdEvaluation = await this.aiService.invokeAiOotdRoasting(
      dto.imageId,
      dto.spicyLevel,
    );
    return new OotdRoastingResponseDto(ootdEvaluation);
  }
}
