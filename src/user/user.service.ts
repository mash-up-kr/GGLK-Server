import { Injectable } from '@nestjs/common';
import { TOKEN_TYPE } from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';
import { User } from './entities/user.entity';
import {
  GuestUserNotFoundException,
  UserNotFoundException,
} from './exceptions';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userPayload: UserPayload) {
    if (userPayload.tokenType === TOKEN_TYPE.GUEST) {
      return {
        isGuest: true,
      };
    }

    // Expect Token Type is not guest
    const user = await this.findById(userPayload.id);
    if (!user) {
      throw new UserNotFoundException();
    }

    return {
      isGuest: false,
      id: user.id,
      name: user.name,
    };
  }

  async createGuestUser() {
    return await this.userRepository.save({});
  }

  async findOrCreateUser(
    oauthProivderId: string,
    userName: string,
    strategyType: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { providerId: oauthProivderId },
    });
    if (existingUser) {
      return existingUser;
    }

    const newUser = this.userRepository.create({
      name: userName ?? '',
      joinedAt: new Date(),
      isDeleted: false,
      strategyType: strategyType,
      providerId: oauthProivderId,
    });
    return this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async guestUserMigration(
    guestUserId: string,
    oauthProviderId: string,
    userName: string,
    strategyType: string,
  ): Promise<User> {
    const guestUser = await this.findById(guestUserId);
    if (!guestUser) {
      throw new GuestUserNotFoundException();
    }

    // Oauth Provider의 Provider ID가 이미 회원으로서 존재하는 경우 확인해야함 (중복회원 방지)
    const checkUserExistWithProvider = await this.userRepository.findOne({
      where: {
        providerId: oauthProviderId,
        strategyType: strategyType,
      },
    });
    if (checkUserExistWithProvider) {
      return checkUserExistWithProvider;
    }

    // 지정된 Guest User ID가 이미 Oauth 로그인으로 회원이 된 상태인 경우
    if (guestUser.providerId && guestUser.strategyType) {
      return guestUser;
    }
    guestUser.providerId = oauthProviderId;
    guestUser.strategyType = strategyType;
    guestUser.joinedAt = new Date();
    guestUser.name = userName || guestUser.name || '';

    return this.userRepository.save(guestUser);
  }
}
