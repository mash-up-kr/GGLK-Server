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
export const STRATEGY_TYPE = {
  KAKAO: 'kakao', // 카카오 인증 전략
} as const;
// 인증 관련 타입 정의
export type CookieSameSite =
  (typeof COOKIE_SAMESITE)[keyof typeof COOKIE_SAMESITE];
export type StrategyType = (typeof STRATEGY_TYPE)[keyof typeof STRATEGY_TYPE];

// 인증 관련 에러 메세지
export const ERROR_MESSAGES = {
  USER: {
    ID_REQUIRED: '사용자 ID는 필수입니다.',
  },
  REDIRECT_URL: {
    NOT_EXIST: 'Redirect URL이 존재하지 않습니다.',
    NO_ALLOWED: '허용 불가능한 Redirect URL입니다.',
  },
} as const;
// Redirect URL 관리
export const REDIRECT_WHITELIST = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://ooootd.com',
];
