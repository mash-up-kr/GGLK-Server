import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '@gglk/user/user.repository';
import { JWT_STRATEGY_TOKEN } from '../auth.constant';
import { UserPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  JWT_STRATEGY_TOKEN,
) {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {
    super({
      secretOrKey: config.get<string>('JWT_SECRET')!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload | false> {
    const isUserExist = await this.userRepository.exists({
      where: { id: payload.id },
    });
    if (!isUserExist) {
      return false;
    }

    return payload;
  }
}
