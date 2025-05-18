import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@gglk/auth/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: UserPayload): string {
    const payload = new UserPayload(user);
    return this.jwtService.sign(payload);
  }
}
