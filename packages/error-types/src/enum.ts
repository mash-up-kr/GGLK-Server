/**
 *
 * Base Convention
 *
 * Gxxxx
 *
 * First number: Module Number
 * Other number: Error Number
 */
import { HttpStatus } from './status';

// Global Module - 0

export const GlobalErrorKey = {
  PROGRAMATTIC_ERROR: 'PROGRAMATTIC_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

const GlobalModuleError = {
  [GlobalErrorKey.PROGRAMATTIC_ERROR]: {
    errorCode: 'G0001',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [GlobalErrorKey.VALIDATION_ERROR]: {
    errorCode: 'G0002',
    statusCode: HttpStatus.BAD_REQUEST,
  },
} as const;

// Auth Module - 1

export const AuthModuleKey = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  FORBIDDEN_REQUEST: 'FORBIDDEN_REQUEST',
} as const;

const AuthModuleError = {
  [AuthModuleKey.UNAUTHORIZED]: {
    errorCode: 'G1001',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [AuthModuleKey.INVALID_CREDENTIALS]: {
    errorCode: 'G1002',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [AuthModuleKey.FORBIDDEN_REQUEST]: {
    errorCode: 'G1003',
    statusCode: HttpStatus.FORBIDDEN,
  },
} as const;

// User Module - 2

export const UserModuleKey = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

const UserModuleError = {
  [UserModuleKey.USER_NOT_FOUND]: {
    errorCode: 'G2001',
    statusCode: HttpStatus.NOT_FOUND,
  },
} as const;

export const ModuleErrors = {
  ...GlobalModuleError,
  ...AuthModuleError,
  ...UserModuleError,
};
