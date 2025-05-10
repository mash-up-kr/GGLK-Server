import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PROCESS_EXPIRATION_TIME } from './auth.constant';
import { UserPayload } from './auth.interface';

@Injectable()
export class AuthService {
  generateToken(user: UserPayload): string {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: PROCESS_EXPIRATION_TIME,
    });
  }
}
