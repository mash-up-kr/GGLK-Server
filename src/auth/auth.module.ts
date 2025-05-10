// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './kakao.strategy';

@Module({
  imports: [PassportModule],
  providers: [KakaoStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
