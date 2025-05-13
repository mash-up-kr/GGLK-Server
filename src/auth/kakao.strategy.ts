import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID!,
      callbackURL: process.env.KAKAO_REDIRECT_DEV_URI!,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken, refreshToken, profile);
    return { isLoggedIn: true };
  }
}
