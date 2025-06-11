import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { OotdRoastingDocs } from './docs';
import { OotdRoastingRequestDto, OotdRoastingResponseDto } from './dto';

@Controller('ai')
@ApiTags('Ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('ootd')
  @OotdRoastingDocs
  async doOotdRoasting(
    @Body() dto: OotdRoastingRequestDto,
  ): Promise<OotdRoastingResponseDto> {
    const ootdEvaluation = await this.aiService.invokeAiOotdRoasting(
      dto.imageId,
      dto.spicyLevel,
    );
    return new OotdRoastingResponseDto(ootdEvaluation);
  }
}
