/**
 *
 * Base Convention
 *
 * Gxxxx
 *
 * First number: Module Number
 * Other number: Error Number
 */

// Global Module - 0

export enum GlobalErrorKey {
  PROGRAMATTIC_ERROR = 'PROGRAMATTIC_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

const GlobalModuleError = {
  [GlobalErrorKey.PROGRAMATTIC_ERROR]: {
    errorCode: 'G0001',
    statusCode: 500,
  },
  [GlobalErrorKey.VALIDATION_ERROR]: {
    errorCode: 'G0002',
    statusCode: 400,
  },
} as const;

// Auth Module - 1

export enum AuthModuleKey {
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  FORBIDDEN_REQUEST = 'FORBIDDEN_REQUEST',
}

const AuthModuleError = {
  [AuthModuleKey.UNAUTHORIZED]: {
    errorCode: 'G1001',
    statusCode: 401,
  },
  [AuthModuleKey.INVALID_CREDENTIALS]: {
    errorCode: 'G1002',
    statusCode: 401,
  },
  [AuthModuleKey.FORBIDDEN_REQUEST]: {
    errorCode: 'G1003',
    statusCode: 403,
  },
} as const;

// User Module - 2

export enum UserModuleKey {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

const UserModuleError = {
  [UserModuleKey.USER_NOT_FOUND]: {
    errorCode: 'G2001',
    statusCode: 404,
  },
} as const;

export const ModuleErrors = {
  ...GlobalModuleError,
  ...AuthModuleError,
  ...UserModuleError,
};
