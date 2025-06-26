import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosError } from 'axios';
import { KakaoUserResponse, UserPayload } from '@gglk/auth/auth.interface';
import { UserService } from '@gglk/user/user.service';
import { KakaoOauthException } from './exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async getKakaoUserAccessToken(code: string, redirectUri: string) {
    try {
      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append(
        'client_id',
        this.configService.get<string>('KAKAO_CLIENT_ID')!,
      );
      data.append('code', code);
      data.append('redirect_uri', redirectUri);

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );
      const { access_token }: { access_token: string; [k: string]: unknown } =
        response.data;
      return access_token;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(
          'Error while making authentication to Kakao - Get bearer token',
        );
        throw new KakaoOauthException();
      } else {
        throw e;
      }
    }
  }

  async getKakaoUserByAccessToken(accessToken: string) {
    try {
      const userRes = await axios.get<KakaoUserResponse>(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const kakaoUser = userRes.data;
      console.log(kakaoUser);
      return {
        id: kakaoUser.id.toString(),
        name: kakaoUser.properties?.nickname,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(
          'Error while making authentication to Kakao - Get user information',
        );
        throw new KakaoOauthException();
      } else {
        throw e;
      }
    }
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
