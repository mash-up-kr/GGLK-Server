import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@gglk/auth/auth.controller';
import { AuthService } from '@gglk/auth/auth.service';
import { KakaoStrategy } from '@gglk/auth/strategy/kakao.strategy';
import { UserModule } from '@gglk/user/user.module';
import { UserRepository } from '@gglk/user/user.repository';
import { PROCESS_EXPIRATION_TIME } from './auth.constant';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: PROCESS_EXPIRATION_TIME },
    }),
  ],
  providers: [UserRepository, KakaoStrategy, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
