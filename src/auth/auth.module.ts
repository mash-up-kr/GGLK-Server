import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@gglk/auth/auth.controller';
import { AuthService } from '@gglk/auth/auth.service';
import { KakaoStrategy } from '@gglk/auth/strategy/kakao.strategy';

@Module({
  imports: [PassportModule],
  providers: [KakaoStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
