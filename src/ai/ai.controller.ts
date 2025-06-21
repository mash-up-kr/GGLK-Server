import {
  Body,
  Controller,
  NotImplementedException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserPayload } from '@gglk/auth/auth.interface';
import { JwtAuthGuard } from '@gglk/auth/guard/jwt.guard';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { UserType } from '@gglk/common/decorator/user-type.decorator';
import { UserTypeGuard } from '@gglk/common/guard/user-type.guard';
import { AiService } from './ai.service';
import { AiControllerDocs, OotdRoastingDocs } from './docs';
import { OotdRoastingRequestDto, OotdRoastingResponseDto } from './dto';

@Controller('ai')
@UserType(['USER', 'GUEST'])
@UseGuards(JwtAuthGuard, UserTypeGuard)
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
