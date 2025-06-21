import { TOKEN_TYPE } from './auth.constant';

export interface UserPayload {
  id: string;
  email?: string;
  name?: string;
  tokenType: TOKEN_TYPE;
}
