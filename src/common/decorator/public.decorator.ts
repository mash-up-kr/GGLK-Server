import { SetMetadata } from '@nestjs/common';

export const PublicRouteToken = Symbol('public-token');
export const Public = () => SetMetadata(PublicRouteToken, true);

// Check public metadata available
export function validatePublicRoute(metadata: boolean | Array<boolean>) {
  return (
    (Array.isArray(metadata) && metadata.length) ||
    typeof metadata === 'boolean'
  );
}
