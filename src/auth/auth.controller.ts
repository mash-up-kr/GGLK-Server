import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  COOKIE_SAMESITE,
  IS_SECURE,
  PROCESS_EXPIRATION_TIME,
  STRATEGY_TYPE,
} from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';
import { AuthService } from '@gglk/auth/auth.service';
import { KakaoGuard } from '@gglk/auth/guard/kakao.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(KakaoGuard)
  async kakaoUnifiedHandler(@Req() req: Request, @Res() res: Response) {
    if (!req.user) return;

    const user = req.user as UserPayload;
    const token = await this.authService.generateToken(
      user,
      STRATEGY_TYPE.KAKAO,
    );

    res.cookie('Authorization', token, {
      httpOnly: false,
      secure: IS_SECURE,
      sameSite: COOKIE_SAMESITE.LAX,
      maxAge: PROCESS_EXPIRATION_TIME,
    });

    res.redirect(process.env.FRONTEND_DEV_URL!);
  }
}
