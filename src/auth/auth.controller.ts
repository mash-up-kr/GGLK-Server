import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { Response } from 'express';
import {
  COOKIE_SAMESITE,
  IS_SECURE,
  PROCESS_EXPIRATION_TIME,
  STRATEGY_TYPE,
} from '@gglk/auth/auth.constant';
import { AuthService } from '@gglk/auth/auth.service';
import { RequestHeader } from '@gglk/common/decorator/header-extractor.decorator';
import { GuestTokenDocs } from './docs';
import { KakakoLoginRequestDto, TokenResponseDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest')
  @GuestTokenDocs
  async guestToken(@Res({ passthrough: true }) response: Response) {
    const token = await this.authService.generateGuestToken();

    response.cookie('Authorization', token, {
      httpOnly: false,
      secure: IS_SECURE,
      sameSite: COOKIE_SAMESITE.LAX,
      maxAge: PROCESS_EXPIRATION_TIME,
    });

    return new TokenResponseDto({
      token,
    });
  }

  @Post('kakao')
  @ApiHeader({
    name: 'x-guest-user-id',
    description:
      'Guest user id. This is optional and only use when guest user should be migrated to authenticated user',
    required: false,
  })
  async kakaoLoginHandler(
    @RequestHeader('x-guest-user-id') guestUserId: string,
    @Body() body: KakakoLoginRequestDto,
    @Res() res: Response,
  ) {
    const access_token = await this.authService.getKakaoUserAccessToken(
      body.code,
      body.redirectUri,
    );

    const kakaoUser =
      await this.authService.getKakaoUserByAccessToken(access_token);

    const token = guestUserId
      ? await this.authService.generateTokenWithGuestUserMigration(
          kakaoUser.id,
          kakaoUser.name,
          STRATEGY_TYPE.KAKAO,
          guestUserId,
        )
      : await this.authService.generateToken(
          kakaoUser.id,
          kakaoUser.name,
          STRATEGY_TYPE.KAKAO,
        );

    res.json({ token });
  }
}
