import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PROCESS_EXPIRATION_TIME } from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';

@Injectable()
export class AuthService {
  generateToken(user: UserPayload): string {
    const payload: UserPayload = new UserPayload(user);

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: PROCESS_EXPIRATION_TIME,
    });
  }
}
