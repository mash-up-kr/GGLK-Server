import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  COOKIE_SAMESITE,
  ERROR_MESSAGES,
  IS_SECURE,
  PROCESS_EXPIRATION_TIME,
  REDIRECT_WHITELIST,
  STRATEGY_TYPE,
} from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';
import { AuthService } from '@gglk/auth/auth.service';
import { KakaoGuard } from '@gglk/auth/guard/kakao.guard';
import { BaseException } from '@gglk/common/exception/base.exception';
import { GuestTokenDocs } from './docs';
import { TokenResponseDto } from './dto';

function validateRedirectUrl(url?: string): void {
  if (!url) {
    throw new BaseException(400, ERROR_MESSAGES.REDIRECT_URL.NOT_EXIST);
  }

  const isAllowed = REDIRECT_WHITELIST.some((allowed) =>
    url.startsWith(allowed),
  );

  if (!isAllowed) {
    throw new BaseException(400, ERROR_MESSAGES.REDIRECT_URL.NO_ALLOWED);
  }
}
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

  @Get('kakao')
  @UseGuards(KakaoGuard)
  @ApiOperation({
    summary: 'Kakao Oauth API',
    description: `
    리다이렉트 state 변수에는 아래 두개의 값이 담긴 JSON을 Stringify 후 전달해주어야함
      {
        redirectUrl: "(리다이렉트 URL)",
        guestId: "(기존 Guest User의 토큰 내 ID)"
      }
    `,
  })
  async kakaoUnifiedHandler(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    if (!request.user) return;
    /**
     * Frontend에서 state Query String 전달시
     *
     * - redirectURL
     * - guestId
     *
     * 이 두개가 담긴 JSON을 Stringify 후 전달해주어야함
     */

    const state = request.query.state as string;
    let redirectUrl: string;
    let guestUserId: string | undefined;

    try {
      const stateJSON: { redirectUrl: string; guestId: string } = JSON.parse(
        decodeURIComponent(state),
      );
      redirectUrl = stateJSON.redirectUrl;
      guestUserId = stateJSON.guestId;
    } catch {
      redirectUrl = decodeURIComponent(state);
    }

    validateRedirectUrl(redirectUrl);

    const user = request.user as UserPayload;
    const token = guestUserId
      ? await this.authService.generateTokenWithGuestUserMigration(
          user,
          STRATEGY_TYPE.KAKAO,
          guestUserId,
        )
      : await this.authService.generateToken(user, STRATEGY_TYPE.KAKAO);

    response.cookie('Authorization', token, {
      httpOnly: false,
      secure: IS_SECURE,
      sameSite: COOKIE_SAMESITE.LAX,
      maxAge: PROCESS_EXPIRATION_TIME,
    });

    response.redirect(redirectUrl);
  }
}
