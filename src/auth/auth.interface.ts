import { ERROR_MESSAGES } from '@gglk/auth/auth.constant';

export class UserPayload {
  id: string;
  email?: string;
  nickname?: string;

  constructor({ id, email, nickname }: Partial<UserPayload>) {
    if (!id) throw new Error(ERROR_MESSAGES.USER.ID_REQUIRED);
    this.id = id;
    this.email = email;
    this.nickname = nickname;
  }
}
