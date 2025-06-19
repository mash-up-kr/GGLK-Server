import { Injectable } from '@nestjs/common';
import { TOKEN_TYPE } from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exceptions';
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
    const user = await this.findById(userPayload.id!);
    if (!user) {
      throw new UserNotFoundException();
    }

    return {
      isGuest: false,
      id: user.id,
      name: user.name,
    };
  }

  async findOrCreateUser(
    payload: UserPayload,
    strategyType: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { providerId: payload.id },
    });
    if (existingUser) {
      return existingUser;
    }

    const newUser = this.userRepository.create({
      name: payload.name ?? '',
      joinedAt: new Date(),
      isDeleted: false,
      strategyType: strategyType,
      providerId: payload.id,
    });
    return this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isDeleted: false },
    });
  }
}
