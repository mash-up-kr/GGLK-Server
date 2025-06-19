import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
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
  guestToken() {
    const token = this.authService.generateGuestToken();
    return new TokenResponseDto({
      token,
    });
  }

  @Get('kakao')
  @UseGuards(KakaoGuard)
  async kakaoUnifiedHandler(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    if (!request.user) return;

    const state = request.query.state as string;
    const redirectUrl = decodeURIComponent(state);
    validateRedirectUrl(redirectUrl);

    const user = request.user as UserPayload;
    const token = await this.authService.generateToken(
      user,
      STRATEGY_TYPE.KAKAO,
    );

    response.cookie('Authorization', token, {
      httpOnly: false,
      secure: IS_SECURE,
      sameSite: COOKIE_SAMESITE.LAX,
      maxAge: PROCESS_EXPIRATION_TIME,
    });

    response.redirect(redirectUrl);
  }
}
