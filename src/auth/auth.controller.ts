import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserPayload } from '@gglk/auth/auth.interface';
import { AuthService } from '@gglk/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserPayload;
    const payload: UserPayload = new UserPayload(user);
    const token = this.authService.generateToken(payload);
    res.redirect(`${process.env.FRONTEND_DEV_URL}?token=${token}`);
  }
}
