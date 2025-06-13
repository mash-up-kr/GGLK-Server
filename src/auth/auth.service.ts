import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@gglk/auth/auth.interface';
import { UserService } from '@gglk/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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
      name: user.name,
    };
    return this.jwtService.sign(payload);
  }
}
