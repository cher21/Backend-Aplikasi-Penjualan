import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): any {
    const isPublic = this.reflector.get<boolean>(
      'IS_PUBLIC_KEY',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('tidak terautorisasi');
    } else {
      try {
        return jwt.verify(token, process.env.SECRET_KEY);
      } catch {
        throw new UnauthorizedException('token salah');
      }
    }
  }
}
