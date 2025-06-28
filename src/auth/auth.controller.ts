import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  COOKIE_SAMESITE,
  IS_SECURE,
  PROCESS_EXPIRATION_TIME,
  STRATEGY_TYPE,
} from '@gglk/auth/auth.constant';
import { AuthService } from '@gglk/auth/auth.service';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { KakaoLoginHandlerGuardDefinition } from './decorator/kakao-login.decorator';
import { GuestTokenDocs } from './docs';
import { KakaoLoginHandlerDocs } from './docs/kakao-login.docs';
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
  @KakaoLoginHandlerGuardDefinition
  @KakaoLoginHandlerDocs
  async kakaoLoginHandler(
    @GetUser('id') guestUserId: string,
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
