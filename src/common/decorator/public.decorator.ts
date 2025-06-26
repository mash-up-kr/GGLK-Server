import { SetMetadata } from '@nestjs/common';

export const PublicRouteToken = Symbol('public-token');
export const Public = () => SetMetadata(PublicRouteToken, true);
