import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@gglk/auth/auth.interface';
import { UserService } from '@gglk/user/user.service';
import { TOKEN_TYPE } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateGuestToken(): string {
    const payload: UserPayload = {
      tokenType: TOKEN_TYPE.GUEST,
    };
    return this.jwtService.sign(payload);
  }

  async generateToken(
    userPayload: UserPayload,
    strategyType: string,
  ): Promise<string> {
    const user = await this.userService.findOrCreateUser(
      userPayload,
      strategyType,
    );

    const payload: UserPayload = {
      id: user.id,
      name: user?.name ?? '',
      tokenType: TOKEN_TYPE.USER,
    };
    return this.jwtService.sign(payload);
  }
}
