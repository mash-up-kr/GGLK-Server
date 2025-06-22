import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UserPayload } from '@gglk/auth/auth.interface';
import { UserService } from '@gglk/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async getKakaoUserByAccessToken(accessToken: string): Promise<UserPayload> {
    const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const kakaoUser = userRes.data as {
      id: number | string;
      properties?: { nickname?: string };
    };

    return {
      id: kakaoUser.id.toString(),
      name: kakaoUser.properties?.nickname ?? 'unknown',
    };
  }

  // 내부 서비스 전용 JWT 토큰 발급
  async generateToken(
    userPayload: UserPayload,
    strategyType: string,
  ): Promise<string> {
    const user = await this.userService.findOrCreateUser(
      userPayload,
      strategyType,
    );

    return this.jwtService.sign({
      id: user.id,
      name: user.name,
    });
  }
}
