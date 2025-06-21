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

type IErrorPayload = {
  errorMessage: string;
  statusCode: (typeof HttpStatus)[keyof typeof HttpStatus];
};

// Global Module - 0

export const GlobalErrorKey = {
  PROGRAMATTIC_ERROR: 'G0001',
  VALIDATION_ERROR: 'G0002',
} as const;

const GlobalModuleError: Record<string, IErrorPayload> = {
  [GlobalErrorKey.PROGRAMATTIC_ERROR]: {
    errorMessage: 'PROGRAMATTIC_ERROR',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [GlobalErrorKey.VALIDATION_ERROR]: {
    errorMessage: 'VALIDATION_ERROR',
    statusCode: HttpStatus.BAD_REQUEST,
  },
} as const;

// Auth Module - 1

export const AuthModuleKey = {
  UNAUTHORIZED: 'G1001',
  INVALID_CREDENTIALS: 'G1002',
  FORBIDDEN_REQUEST: 'G1003',
} as const;

const AuthModuleError: Record<string, IErrorPayload> = {
  [AuthModuleKey.UNAUTHORIZED]: {
    errorMessage: 'UNAUTHORIZED',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [AuthModuleKey.INVALID_CREDENTIALS]: {
    errorMessage: 'INVALID_CREDENTIALS',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [AuthModuleKey.FORBIDDEN_REQUEST]: {
    errorMessage: 'FORBIDDEN_REQUEST',
    statusCode: HttpStatus.FORBIDDEN,
  },
} as const;

// User Module - 2

export const UserModuleKey = {
  USER_NOT_FOUND: 'G2001',
  USER_ALREADY_EXISTS: 'G2002',
} as const;

const UserModuleError: Record<string, IErrorPayload> = {
  [UserModuleKey.USER_NOT_FOUND]: {
    errorMessage: 'USER_NOT_FOUND',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [UserModuleKey.USER_ALREADY_EXISTS]: {
    errorMessage: 'USER_ALREADY_EXISTS',
    statusCode: HttpStatus.BAD_REQUEST,
  },
} as const;

// Picture Module - 3

export const PictureModuleKey = {
  PICTURE_NOT_FOUND: 'G3001',
  NCP_NETWORK_ERROR: 'G3002',
} as const;

const PictureModuleError: Record<string, IErrorPayload> = {
  [PictureModuleKey.NCP_NETWORK_ERROR]: {
    errorMessage: 'NCP_NETWORK_ERROR',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [PictureModuleKey.PICTURE_NOT_FOUND]: {
    errorMessage: 'PICTURE_NOT_FOUND',
    statusCode: HttpStatus.NOT_FOUND,
  },
} as const;

export const ModuleErrors = {
  ...GlobalModuleError,
  ...AuthModuleError,
  ...UserModuleError,
  ...PictureModuleError,
};
