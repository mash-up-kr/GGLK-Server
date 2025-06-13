import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@gglk/auth/auth.controller';
import { AuthService } from '@gglk/auth/auth.service';
import { KakaoStrategy } from '@gglk/auth/strategy/kakao.strategy';
import { UserModule } from '@gglk/user/user.module';
import { PROCESS_EXPIRATION_TIME } from './auth.constant';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: PROCESS_EXPIRATION_TIME },
    }),
  ],
  providers: [KakaoStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
