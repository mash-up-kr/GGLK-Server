import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID!,
      callbackURL: process.env.KAKAO_REDIRECT_DEV_URI!,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const id = String(profile.id);
    const nickname = profile.username || profile.displayName;

    return {
      id,
      nickname,
    };
  }
}
