import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom } from 'rxjs';
import { KakaoUserResponse, UserPayload } from '@gglk/auth/auth.interface';
import { UserService } from '@gglk/user/user.service';
import { TOKEN_TYPE } from './auth.constant';
import { KakaoOauthException } from './exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private get KAKAO_GRANT_TYPE() {
    return 'authorization_code';
  }

  async getKakaoUserAccessToken(code: string, redirect_uri: string) {
    const data = new URLSearchParams({
      grant_type: this.KAKAO_GRANT_TYPE,
      client_id: this.configService.get<string>('KAKAO_CLIENT_ID')!,
      code,
      redirect_uri,
    });

    const response = await firstValueFrom(
      this.httpService
        .post<{ access_token: string; [k: string]: unknown }>(
          'https://kauth.kakao.com/oauth/token',
          data,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        .pipe(
          catchError((error) => {
            console.error(error);
            throw new KakaoOauthException();
          }),
        ),
    );

    return response.data.access_token;
  }

  async getKakaoUserByAccessToken(accessToken: string) {
    const userRes = await firstValueFrom(
      this.httpService
        .get<KakaoUserResponse>('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error) => {
            console.error(error);
            throw new KakaoOauthException();
          }),
        ),
    );

    const { data: kakaoUser } = userRes;

    return {
      id: kakaoUser.id.toString(),
      name: kakaoUser.properties?.nickname ?? '',
    };
  }

  async generateGuestToken() {
    const user = await this.userService.createGuestUser();
    const payload: UserPayload = {
      id: user.id,
      tokenType: TOKEN_TYPE.GUEST,
    };
    return this.jwtService.sign(payload);
  }

  async generateToken(
    oauthProivderId: string,
    userName: string,
    strategyType: string,
  ): Promise<string> {
    const user = await this.userService.findOrCreateUser(
      oauthProivderId,
      userName,
      strategyType,
    );

    return this.jwtService.sign({
      id: user.id,
      name: user?.name ?? '',
      tokenType: TOKEN_TYPE.USER,
    });
  }

  async generateTokenWithGuestUserMigration(
    oauthProviderId: string,
    userName: string,
    strategyType: string,
    guestUserId: string,
  ): Promise<string> {
    const convertedUser = await this.userService.guestUserMigration(
      guestUserId,
      oauthProviderId,
      userName,
      strategyType,
    );

    const payload: UserPayload = {
      id: convertedUser.id,
      name: convertedUser.name ?? '',
      tokenType: TOKEN_TYPE.USER,
    };
    return this.jwtService.sign(payload);
  }
}
