// TODO 프로덕션 환경 여부(추후 common으로 뺄 지 논의 필요)
export const IS_PROD = process.env.APP_ENV === 'prod';

// JWT 관련 상수
export const IS_SECURE = IS_PROD ? true : false;
export const PROCESS_EXPIRATION_TIME = 1000 * 60 * 60 * 24;
export const COOKIE_SAMESITE = {
  LAX: 'lax', // 대부분의 GET/링크 요청에만 쿠키 전송
  STRICT: 'strict', // 동일 사이트 요청에만 쿠키 전송
  NONE: 'none', // 모든 요청에 쿠키 전송 (secure 필요)
} as const;
export type CookieSameSite =
  (typeof COOKIE_SAMESITE)[keyof typeof COOKIE_SAMESITE];

// 인증 관련 에러 메세지
export const ERROR_MESSAGES = {
  USER: {
    ID_REQUIRED: '사용자 ID는 필수입니다.',
  },
} as const;
