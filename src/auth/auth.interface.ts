export interface UserPayload {
  id: string;
  email?: string;
  name?: string;
}

export interface KakaoUserResponse {
  id: number | string;
  properties?: {
    nickname?: string;
    email?: string;
  };
}
