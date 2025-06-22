import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  COOKIE_SAMESITE,
  IS_SECURE,
  PROCESS_EXPIRATION_TIME,
  STRATEGY_TYPE,
} from '@gglk/auth/auth.constant';
import { AuthService } from '@gglk/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  // eslint-disable-next-line @typescript-eslint/require-await
  async kakaoRedirectHandler(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const state = request.query.state as string;
    const code = request.query.code as string;
    const redirectUrl = decodeURIComponent(state);

    response.cookie('code', code, {
      httpOnly: false,
      secure: IS_SECURE,
      sameSite: COOKIE_SAMESITE.LAX,
      maxAge: PROCESS_EXPIRATION_TIME,
    });

    response.redirect(redirectUrl);
  }

  @Post('kakao/login')
  async kakaoLoginHandler(
    @Body() body: { access_token: string },
    @Res() res: Response,
  ) {
    const kakaoUser = await this.authService.getKakaoUserByAccessToken(
      body.access_token,
    );

    const token = await this.authService.generateToken(
      kakaoUser,
      STRATEGY_TYPE.KAKAO,
    );

    res.json({ token });
  }
}
